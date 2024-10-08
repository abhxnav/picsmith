'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Button,
  Form,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import {
  aspectRatioOptions,
  transformationDefaultValues,
  transformationTypes,
} from '@/constants'
import {
  AspectRatioKey,
  TransformationFormProps,
  Transformations,
} from '@/types'
import { CustomFormField, MediaUploader, TransformedImage } from '@/components'
import { useState, useTransition } from 'react'
import { debounce, mergeObjects } from '@/lib/utils'

export const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
})

const TransformationForm = ({
  data = null,
  action,
  userId,
  type,
  creditBalance,
  config = null,
}: TransformationFormProps) => {
  const transformationType = transformationTypes[type]

  const [image, setImage] = useState<any>(data)
  const [newTransformation, setNewTransformation] =
    useState<Transformations | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isTransforming, setIsTransforming] = useState(false)
  const [transformationConfig, setTransformationConfig] = useState(config)

  const [isPending, startTransition] = useTransition()

  const initialValues =
    data && action === 'Update'
      ? {
          title: data?.title,
          aspectRatio: data?.aspectRatio,
          color: data?.color,
          prompt: data?.prompt,
          publicId: data?.publicId,
        }
      : transformationDefaultValues

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  const onSelectHandler = (
    value: string,
    onChange: (value: string) => void
  ) => {
    const imageSize = aspectRatioOptions[value as AspectRatioKey]

    setImage((prevState: any) => ({
      ...prevState,
      aspectRatio: imageSize.aspectRatio,
      width: imageSize.width,
      height: imageSize.height,
    }))

    setNewTransformation(transformationType.config)

    return onChange(value)
  }

  const onInputHandler = (
    fieldName: string,
    value: string,
    type: string,
    onChange: (value: string) => void
  ) => {
    debounce(() => {
      setNewTransformation((prevState: any) => ({
        ...prevState,
        [type]: {
          ...prevState?.[type],
          [fieldName === 'prompt' ? 'prompt' : 'to']: value,
        },
      }))

      return onChange(value)
    }, 1000)
  }

  const onTransformHandler = async () => {
    setIsTransforming(true)

    setTransformationConfig(
      mergeObjects(newTransformation, transformationConfig)
    )

    setNewTransformation(null)

    // TODO: update credits
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomFormField
          control={form.control}
          name="title"
          formLabel="Image Title"
          className="w-full"
          render={({ field }) => (
            <Input
              {...field}
              className="rounded-2xl border-2 border-green-200/40 shadow-sm shadow-green-200/40 text-dark-700 disabled:opacity-100 text-base font-semibold h-12 md:h-14 focus-visible:ring-offset-0 px-4 py-3 focus-visible:ring-transparent"
            />
          )}
        />

        {type === 'fill' && (
          <CustomFormField
            control={form.control}
            name="aspectRatio"
            formLabel="Aspect Ratio"
            className="w-full"
            render={({ field }) => (
              <Select
                onValueChange={(value) =>
                  onSelectHandler(value, field.onChange)
                }
              >
                <SelectTrigger className="w-full border-2 border-green-200/40 shadow-sm shadow-green-200/40 rounded-2xl h-12 md:h-14 text-dark-600 font-semibold disabled:opacity-100 placeholder:text-dark-400/50 px-4 py-3 focus:ring-offset-0 focus-visible:ring-transparent focus:ring-transparent focus-visible:ring-0 focus-visible:outline-none">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent className="bg-dark-400 text-dark-700 border border-green-200/40">
                  {Object.keys(aspectRatioOptions).map((key) => (
                    <SelectItem
                      key={key}
                      value={key}
                      className="py-3 cursor-pointer select-item"
                    >
                      {aspectRatioOptions[key as AspectRatioKey].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        )}

        {(type === 'remove' || type === 'recolor') && (
          <div className="flex flex-col gap-5 lg:flex-row lg:gap-10">
            <CustomFormField
              control={form.control}
              name="prompt"
              formLabel={
                type === 'remove' ? 'Object to remove' : 'Object to recolor'
              }
              className="w-full"
              render={({ field }) => (
                <Input
                  value={field.value}
                  className="rounded-2xl border-2 border-green-200/40 shadow-sm shadow-green-200/40 text-dark-600 disabled:opacity-100 font-semibold h-12 md:h-14 focus-visible:ring-offset-0 px-4 py-3 focus-visible:ring-transparent"
                  onChange={(e) =>
                    onInputHandler(
                      'prompt',
                      e.target.value,
                      type,
                      field.onChange
                    )
                  }
                />
              )}
            />

            {type === 'recolor' && (
              <CustomFormField
                control={form.control}
                name="color"
                formLabel="Replacement Color"
                className="w-full"
                render={({ field }) => (
                  <Input
                    value={field.value}
                    className="rounded-2xl border-2 border-green-200/40 shadow-sm shadow-green-200/40 text-dark-600 disabled:opacity-100 font-semibold h-12 md:h-14 focus-visible:ring-offset-0 px-4 py-3 focus-visible:ring-transparent"
                    onChange={(e) =>
                      onInputHandler(
                        'color',
                        e.target.value,
                        'recolor',
                        field.onChange
                      )
                    }
                  />
                )}
              />
            )}
          </div>
        )}

        <div className="grid h-fit min-h-52 grid-cols-1 gap-5 py-4 md:grid-cols-2">
          <CustomFormField
            control={form.control}
            name="publicId"
            className="flex size-full flex-col"
            render={({ field }) => (
              <MediaUploader
                onValueChange={field.onChange}
                image={image}
                setImage={setImage}
                type={type}
                publicId={field.value}
              />
            )}
          />

          <TransformedImage
            image={image}
            type={type}
            title={form.getValues().title}
            isTransforming={isTransforming}
            setIsTransforming={setIsTransforming}
            transformationConfig={transformationConfig}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Button
            className="bg-accent-400 hover:bg-accent-500 text-dark-300 bg-cover rounded-xl py-4 px-6 font-semibold h-12 w-full md:h-14"
            disabled={isTransforming || newTransformation === null}
            onClick={onTransformHandler}
          >
            {isTransforming ? 'Transforming...' : 'Transform'}
          </Button>
          <Button className="bg-accent-400 hover:bg-accent-500 text-dark-300 bg-cover rounded-xl py-4 px-6 font-semibold h-12 w-full md:h-14">
            {isSubmitting ? 'Submitting...' : 'Save Image'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default TransformationForm
