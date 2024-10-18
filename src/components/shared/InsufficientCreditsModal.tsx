'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const InsufficientCreditsModal = () => {
  const router = useRouter()

  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent className="bg-dark-400 border border-green-200/40">
        <AlertDialogHeader>
          <div className="flex items-center justify-end">
            <AlertDialogCancel
              className="border-none p-0 bg-transparent hover:bg-transparent"
              onClick={() => router.push('/profile')}
            >
              <Image
                src="/assets/icons/close.svg"
                alt="close"
                width={28}
                height={28}
                className="cursor-pointer"
              />
            </AlertDialogCancel>
          </div>
          <div className="w-full flex items-center justify-center pb-8 gap-10">
            <Image
              src="/assets/icons/credits.svg"
              alt="credits"
              width={100}
              height={100}
            />
            <p className="text-accent-400 text-6xl font-semibold font-baloo">
              OOPS!
            </p>
          </div>
          <AlertDialogTitle className="text-2xl font-bold text-dark-800">
            Looks like you don't have enough credits.
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base pb-6 text-dark-600">
            Don't worry. You can resume enjoying our services by purchasing more
            credits.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-1">
          <AlertDialogCancel
            className="p-4 text-base font-semibold focus-visible:ring-offset-0 focus-visible:ring-transparent w-full bg-transparent hover:bg-dark-300 text-dark-800 hover:text-dark-800"
            onClick={() => router.push('/profile')}
          >
            No, cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="p-4 text-base font-semibold focus-visible:ring-offset-0 focus-visible:ring-transparent w-full bg-accent-400 hover:bg-accent-500 text-dark-300"
            onClick={() => router.push('/credits')}
          >
            Yes, proceed
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default InsufficientCreditsModal
