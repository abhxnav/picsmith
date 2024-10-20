import { aspectRatioOptions } from '@/constants'
import {
  AspectRatioKey,
  FormUrlQueryParams,
  RemoveUrlQueryParams,
} from '@/types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import qs from 'qs'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// =========== ERROR HANDLER ===========
export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    console.error(error.message)
    throw new Error(`Error: ${error.message}`)
  } else if (typeof error === 'string') {
    console.error(error)
    throw new Error(`Error: ${error}`)
  } else {
    console.error(error)
    throw new Error(`Unknown error: ${JSON.stringify(error)}`)
  }
}

// =========== DEBOUNCE ===========
export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout | null
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(null, args), delay)
  }
}

// =========== MERGE OBJECTS ===========
export const mergeObjects = (obj1: any, obj2: any) => {
  if (obj2 === null || obj2 === undefined) {
    return obj1
  }

  let output = { ...obj2 }

  for (let key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      if (
        obj1[key] &&
        typeof obj1[key] === 'object' &&
        obj2[key] &&
        typeof obj2[key] === 'object'
      ) {
        output[key] = mergeObjects(obj1[key], obj2[key])
      } else {
        output[key] = obj1[key]
      }
    }
  }

  return output
}

// =========== IMAGE SIZE ===========
export const getImageSize = (
  type: string,
  image: any,
  dimension: 'width' | 'height'
): number => {
  if (type === 'fill') {
    return (
      aspectRatioOptions[image.aspectRatio as AspectRatioKey]?.[dimension] ||
      1000
    )
  }
  return image?.[dimension] || 1000
}

// =========== SHIMMER EFFECT ===========
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#151515" offset="0%" />
      <stop stop-color="#4ade80" offset="50%" />
      <stop stop-color="#151515" offset="100%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#151515" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`
const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

export const dataUrl = `data:image/svg+xml;base64,${toBase64(
  shimmer(1000, 1000)
)}`

// =========== PARSE ===========
export const parseStringify = (data: any) => JSON.parse(JSON.stringify(data))

// =========== URL QUERY ===========
export const formUrlQuery = ({
  searchParams,
  key,
  value,
}: FormUrlQueryParams) => {
  const params = { ...qs.parse(searchParams.toString()), [key]: value }

  return `${window.location.pathname}?${qs.stringify(params, {
    skipNulls: true,
  })}`
}

// ========== REMOVE KEY FROM QUERY ===========
export function removeKeysFromQuery({
  searchParams,
  keysToRemove,
}: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(searchParams)

  keysToRemove.forEach((key) => {
    delete currentUrl[key]
  })

  Object.keys(currentUrl).forEach(
    (key) => currentUrl[key] == null && delete currentUrl[key]
  )

  return `${window.location.pathname}?${qs.stringify(currentUrl)}`
}

// ========== DOWNLOAD IMAGE ===========
export const download = (url: string, filename: string) => {
  if (!url) {
    throw new Error('Resource URL is required')
  }

  fetch(url)
    .then((res) => res.blob())
    .then((blob) => {
      const blobURL = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = blobURL

      if (filename && filename.length) {
        a.download = `${filename.replace(' ', '_')}.png`
      }

      document.body.appendChild(a)
      a.click()
    })
    .catch((error) => console.error(error))
}
