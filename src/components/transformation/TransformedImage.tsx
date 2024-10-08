import { TransformedImageProps } from '@/types'
import { Button } from '@/components/ui'
import Image from 'next/image'
import { CldImage } from 'next-cloudinary'
import { dataUrl, debounce, getImageSize } from '@/lib/utils'
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'

const TransformedImage = ({
  image,
  type,
  title,
  isTransforming,
  setIsTransforming,
  transformationConfig,
  hasDownload = false,
}: TransformedImageProps) => {
  const downloadHandler = (e: any) => {}

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-3xl text-dark-700">Transformed</h3>

        {hasDownload && (
          <Button
            className="font-medium text-sm flex items-center gap-2 px-2 bg-transparent hover:bg-dark-500"
            onClick={downloadHandler}
          >
            <Image
              src="/assets/icons/download.svg"
              alt="Download"
              width={25}
              height={25}
            />
          </Button>
        )}
      </div>

      {image?.publicId && transformationConfig ? (
        <div className="relative">
          <CldImage
            width={getImageSize(type, image, 'width')}
            height={getImageSize(type, image, 'height')}
            src={image?.public_id}
            alt={image.title}
            sizes={'(max-width: 768px) 100vw, 50vw'}
            placeholder={dataUrl as PlaceholderValue}
            className="h-fit min-h-72 w-full rounded-xl border-2 border-dashed border-green-200/40 bg-dark-300 object-cover p-2"
            onLoad={() => {
              setIsTransforming && setIsTransforming(false)
            }}
            onError={() => {
              debounce(() => {
                setIsTransforming && setIsTransforming(false)
              }, 8000)
            }}
            {...transformationConfig}
          />

          {isTransforming && (
            <div className="flex items-center justify-center absolute left-[50%] top-[50%] size-full -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded-xl border bg-dark-700/90">
              <Image src="" width={50} height={50} alt="transforming" />
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center font-medium text-sm h-full min-h-72 flex-col gap-5 rounded-2xl border-2 border-dashed border-green-200/40 bg-dark-300 shadow-inner">
          Transformed Image
        </div>
      )}
    </div>
  )
}

export default TransformedImage
