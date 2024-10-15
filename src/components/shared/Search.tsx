'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'

const Search = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState('')

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        const newUrl = formUrlQuery({
          searchParams: searchParams.toString(),
          key: 'query',
          value: query,
        })

        router.push(newUrl, { scroll: false })
      } else {
        const newUrl = removeKeysFromQuery({
          searchParams: searchParams.toString(),
          keysToRemove: ['query'],
        })

        router.push(newUrl, { scroll: false })
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [router, searchParams, query])

  return (
    <div className="flex w-full rounded-2xl border-2 border-green-200/40 bg-transparent px-4 shadow-sm shadow-green-200/40 md:max-w-96">
      <Image
        src="/assets/icons/search.svg"
        alt="search"
        width={24}
        height={24}
      />

      <Input
        className="border-0 bg-transparent text-dark-800 w-full placeholder:text-dark-600 h-12 text-base font-medium focus-visible:ring-offset-0 p-3 focus-visible:ring-transparent"
        placeholder="Search"
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}

export default Search
