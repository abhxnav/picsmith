import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ERROR HANDLER
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

// DEBOUNCE
export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout | null
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(null, args), delay)
  }
}

// MERGE OBJECTS
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
