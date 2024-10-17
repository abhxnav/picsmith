import { DeleteConfirmation, Header, TransformedImage } from '@/components'
import { Button } from '@/components/ui'
import { getImageById } from '@/lib/actions/image.actions'
import { getImageSize } from '@/lib/utils'
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'

const ImageDetails = async ({ params: { id } }: SearchParamProps) => {
  const { userId } = auth()

  const image = await getImageById(id)

  return (
    <>
      <Header title={image.title} />

      <section className="mt-5 flex flex-wrap gap-4">
        <div className="text-sm font-medium md:text-base flex gap-2">
          <p className="text-dark-800">Transformation:</p>
          <p className="capitalize text-accent-400">
            {image.transformationType}
          </p>
        </div>

        {image.prompt && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="text-sm font-medium md:text-base flex gap-2 ">
              <p className="text-dark-800">Prompt:</p>
              <p className="capitalize text-accent-400">{image.prompt}</p>
            </div>
          </>
        )}

        {image.color && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="text-sm font-medium md:text-base flex gap-2 ">
              <p className="text-dark-800">Color:</p>
              <p className="capitalize text-accent-400">{image.color}</p>
            </div>
          </>
        )}

        {image.aspectRatio && (
          <>
            <p className="hidden text-dark-800 md:block">&#x25CF;</p>
            <div className="text-sm font-medium md:text-base flex gap-2 ">
              <p className="text-dark-800">Aspect Ratio:</p>
              <p className="capitalize text-accent-400">{image.aspectRatio}</p>
            </div>
          </>
        )}
      </section>

      <section className="mt-10 border-t border-dark-400/15">
        <div className="grid h-fit min-h-52 grid-cols-1 gap-5 py-8 md:grid-cols-2">
          {/* MEDIA UPLOADER */}
          <div className="flex flex-col gap-4">
            <h3 className="text-3xl font-bold text-dark-800">Original</h3>

            <Image
              width={getImageSize(image.transformationType, image, 'width')}
              height={getImageSize(image.transformationType, image, 'height')}
              src={image.secureURL}
              alt="image"
              className="h-fit min-h-72 w-full rounded-xl border-2 border-dashed border-green-200/40 bg-dark-300 object-cover p-2"
            />
          </div>

          {/* TRANSFORMED IMAGE */}
          <TransformedImage
            image={image}
            type={image.transformationType}
            title={image.title}
            isTransforming={false}
            transformationConfig={image.config}
            hasDownload={true}
          />
        </div>

        {userId === image.author.clerkId && (
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <Button
              asChild
              type="button"
              className="bg-accent-400 hover:bg-accent-500 text-dark-400 rounded-xl p-6 font-semibold w-full capitalize"
            >
              <Link href={`/transformations/${image._id}/update`}>
                Update Image
              </Link>
            </Button>

            <DeleteConfirmation imageId={image._id} />
          </div>
        )}
      </section>
    </>
  )
}

export default ImageDetails
