'use client'

import { useTransition } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from '@/components/ui'
import { deleteImage } from '@/lib/actions/image.actions'

const DeleteConfirmation = ({ imageId }: { imageId: string }) => {
  const [isPending, startTransition] = useTransition()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="w-full rounded-full">
        <Button
          type="button"
          className="py-4 px-6 flex items-center justify-center gap-3 rounded-full text-base font-semibold focus-visible:ring-offset-0 focus-visible:ring-transparent"
          variant="destructive"
        >
          Delete Image
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="flex flex-col gap-10 bg-dark-400 border border-green-200/40">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-dark-800">
            Are you sure you want to delete this image?
          </AlertDialogTitle>
          <AlertDialogDescription className="font-normal text-base text-dark-700">
            This will permanently delete this image
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="bg-transparent hover:bg-dark-300 hover:text-dark-800 text-dark-800">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="border bg-red-500 text-white hover:bg-red-600"
            onClick={() =>
              startTransition(async () => {
                await deleteImage(imageId)
              })
            }
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteConfirmation
