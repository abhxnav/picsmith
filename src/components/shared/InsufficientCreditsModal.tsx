'use client'

import {
  AlertDialog,
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
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center justify-between">
            <p className="text-base font-semibold text-dark-800">
              Insufficient Credits
            </p>
            <AlertDialogCancel
              className="border-0 p-0 hover:bg-transparent"
              onClick={() => router.push('/profile')}
            >
              <Image
                src="/assets/icons/close.svg"
                alt="close"
                width={24}
                height={24}
                className="cursor-pointer"
              />
            </AlertDialogCancel>
          </div>
          <Image
            src="/assets/icons/coins.svg"
            alt="credits"
            width={100}
            height={100}
          />
          <AlertDialogTitle className="text-2xl font-bold text-dark-500">
            Oops!.. Looks like you don't have enough credits.
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base py-3"></AlertDialogDescription>
          Don't worry. You can resume enjoying our services by purchasing more
          credits.
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="py-4 px-6 flex items-center justify-center gap-3 rounded-full text-base font-semibold focus-visible:ring-offset-0 focus-visible:ring-transparent w-full bg-accent-400 text-dark-300"
            onClick={() => router.push('/profile')}
          >
            No, cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="py-4 px-6 flex items-center justify-center gap-3 rounded-full text-base font-semibold focus-visible:ring-offset-0 focus-visible:ring-transparent w-full bg-accent-400 text-dark-300"
            onClick={() => router.push('/profile')}
          >
            Yes, proceed
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default InsufficientCreditsModal
