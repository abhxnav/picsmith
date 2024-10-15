'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { CldImage } from 'next-cloudinary'
import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
  Button,
} from '@/components/ui'
import { Search } from '@/components'
import { transformationTypes } from '@/constants'
import { formUrlQuery } from '@/lib/utils'
import { IImage, TransformationTypeKey } from '@/types'

const Collection = ({
  hasSearch = false,
  images,
  totalPages = 1,
  page,
}: {
  images: IImage[]
  totalPages?: number
  page: number
  hasSearch?: boolean
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  // PAGINATION HANDLER
  const onPageChange = (action: string) => {
    const pageValue = action === 'next' ? Number(page) + 1 : Number(page) - 1

    const newUrl = formUrlQuery({
      searchParams: searchParams.toString(),
      key: 'page',
      value: pageValue,
    })

    router.push(newUrl, { scroll: false })
  }

  return (
    <>
      <div className="flex md:flex-row md:items-center md:justify-between mb-6 flex-col gap-5">
        <h2 className="text-3xl md:text-4xl font-bold text-dark-800">
          Recent Edits
        </h2>
        {hasSearch && <Search />}
      </div>

      {images.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {images.map((image: IImage) => (
            <Card image={image} key={image._id as string} />
          ))}
        </ul>
      ) : (
        <div className="flex items-center justify-center h-60 w-full rounded-xl border border-green-200/40 bg-transparent">
          <p className="text-xl font-semibold">No matches found</p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-10">
          <PaginationContent className="flex w-full">
            <Button
              disabled={Number(page) <= 1}
              className="py-4 px-6 flex items-center justify-center gap-3 rounded-full focus-visible:ring-offset-0 focus-visible:ring-transparent bg-transparent hover:bg-dark-500 w-32 bg-cover text-dark-800"
              onClick={() => onPageChange('prev')}
            >
              <PaginationPrevious className="hover:bg-transparent hover:text-dark-800 text-base font-semibold" />
            </Button>

            <p className="flex items-center justify-center text-base font-semibold w-fit flex-1 text-dark-800">
              {page} / {totalPages}
            </p>

            <Button
              className="py-4 px-6 flex items-center justify-center gap-3 rounded-full focus-visible:ring-offset-0 focus-visible:ring-transparent bg-transparent hover:bg-dark-500 w-32 bg-cover text-dark-800"
              onClick={() => onPageChange('next')}
              disabled={Number(page) >= totalPages}
            >
              <PaginationNext className="hover:bg-transparent hover:text-dark-800 text-base font-semibold" />
            </Button>
          </PaginationContent>
        </Pagination>
      )}
    </>
  )
}

const Card = ({ image }: { image: IImage }) => {
  return (
    <li>
      <Link
        href={`/transformations/${image._id}`}
        className="flex flex-1 cursor-pointer flex-col gap-5 rounded-2xl border-2 border-green-200/40 bg-dark-300 p-4 shadow-lg hover:shadow-green-200/40 transition-all"
      >
        <CldImage
          src={image.publicId}
          alt={image.title}
          width={image.width}
          height={image.height}
          {...image.config}
          loading="lazy"
          className="h-52 w-full rounded-xl object-cover"
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
        />
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold mr-3 line-clamp-1 text-dark-800">
            {image.title}
          </p>
          <Image
            src={`/assets/icons/${
              transformationTypes[
                image.transformationType as TransformationTypeKey
              ].icon
            }`}
            alt={image.title}
            width={24}
            height={24}
          />
        </div>
      </Link>
    </li>
  )
}

export default Collection
