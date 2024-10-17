'use client'

import React from 'react'
import { TransformedImageProps } from '@/types'
import { Button } from '@/components/ui'
import Image from 'next/image'
import { CldImage, getCldImageUrl } from 'next-cloudinary'
import { dataUrl, debounce, download, getImageSize } from '@/lib/utils'
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
  const downloadHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()

    download(
      getCldImageUrl({
        width: image?.width,
        height: image?.height,
        src: image?.publicId,
        ...transformationConfig,
      }),
      title
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-3xl text-dark-800">Transformed</h3>

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
        <CldImage
          width={getImageSize(type, image, 'width')}
          height={getImageSize(type, image, 'height')}
          src={image?.publicId}
          alt={image?.title}
          sizes={'(max-width: 768px) 100vw, 50vw'}
          placeholder={dataUrl as PlaceholderValue}
          className="h-fit min-h-72 w-full rounded-xl border-2 border-dashed border-green-200/40 bg-dark-300 object-cover p-2"
          onLoad={() => {
            setIsTransforming && setIsTransforming(false)
          }}
          onError={() => {
            debounce(() => {
              setIsTransforming && setIsTransforming(false)
            }, 8000)()
          }}
          {...transformationConfig}
        />
      ) : (
        <div className="flex items-center justify-center font-medium text-sm h-full min-h-72 flex-col gap-5 rounded-2xl border-2 border-dashed border-green-200/40 bg-dark-300 shadow-inner">
          Transformed Image
        </div>
      )}
    </div>
  )
}

export default TransformedImage
