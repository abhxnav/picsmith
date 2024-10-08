'use client'

import { useToast } from '@/hooks/use-toast'
import { dataUrl, getImageSize } from '@/lib/utils'
import { MediaUploaderProps } from '@/types'
import { CldImage, CldUploadWidget } from 'next-cloudinary'
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

const MediaUploader = ({
  onValueChange,
  setImage,
  image,
  publicId,
  type,
}: MediaUploaderProps) => {
  const { toast } = useToast()

  const onUploadSuccessHandler = (result: any) => {
    setImage((prevState: any) => ({
      ...prevState,
      publicId: result?.info?.public_id,
      width: result?.info?.width,
      height: result?.info?.height,
      secureUrl: result?.info?.secure_url,
    }))

    onValueChange(result?.info?.public_id)

    toast({
      title: 'Image uploaded successfully!',
      description: '-1 credit',
      duration: 5000,
      className: 'bg-green-100 text-green-900',
    })
  }

  const onUploadErrorHandler = (error: any) => {
    toast({
      title: 'Something went wrong while uploading. Please try again!',
      description: error.message,
      duration: 5000,
      className: 'bg-red-100 text-red-900',
    })
  }

  return (
    <CldUploadWidget
      uploadPreset="picsmith"
      options={{
        multiple: false,
        resourceType: 'image',
        styles: {
          palette: {
            window: '#151515',
            sourceBg: '#151515',
            windowBorder: '#86efac',
            tabIcon: '#86efac',
            inactiveTabIcon: '#ABB8C4',
            action: '#86efac',
            link: '#86efac',
            inProgress: '#86efac',
            complete: '#86efac',
          },
        },
      }}
      onSuccess={onUploadSuccessHandler}
      onError={onUploadErrorHandler}
    >
      {({ open }) => (
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-3xl">Original</h3>
          {publicId ? (
            <div className="cursor-pointer overflow-hidden rounded-xl">
              <CldImage
                width={getImageSize(type, image, 'width')}
                height={getImageSize(type, image, 'height')}
                src={publicId}
                alt="image"
                sizes={'(max-width: 768px) 100vw, 50vw'}
                placeholder={dataUrl as PlaceholderValue}
                className="h-fit min-h-72 w-full rounded-xl border-2 border-dashed border-green-200/40 bg-dark-300 object-cover p-2"
              />
            </div>
          ) : (
            <div
              className="flex items-center justify-center w-full h-72 cursor-pointer flex-col gap-5 rounded-2xl border-2 border-dashed border-green-200/40 bg-dark-300"
              onClick={() => open()}
            >
              <div className="border border-dashed border-green-200/40 rounded-full p-4">
                <Image
                  src="/assets/icons/upload-to-cloud.svg"
                  alt="Add Image"
                  width={30}
                  height={30}
                />
              </div>
              <p className="font-medium text-sm">Click here to upload image</p>
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  )
}

export default MediaUploader
