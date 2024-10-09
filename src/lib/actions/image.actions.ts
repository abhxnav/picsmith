'use server'

import { AddImageParams, UpdateImageParams } from '@/types'
import { handleError, ParseStringify } from '@/lib/utils'
import { connectToDatabase } from '@/lib/database/mongoose'
import { revalidatePath } from 'next/cache'
import { Image, User } from '@/lib/database/models'
import { redirect } from 'next/navigation'

// =========== ADD IMAGE ===========
export const addImage = async ({ image, userId, path }: AddImageParams) => {
  try {
    await connectToDatabase()

    const author = await User.findById(userId)

    if (!author) throw new Error('Author not found!')

    const newImage = await Image.create({ ...image, author: author._id })

    revalidatePath(path)
    return ParseStringify(newImage)
  } catch (error) {
    handleError(error)
  }
}

// =========== UPDATE IMAGE ===========
export const updateImage = async ({
  image,
  userId,
  path,
}: UpdateImageParams) => {
  try {
    await connectToDatabase()

    const imageToUpdate = await Image.findById(image._id)

    if (!imageToUpdate) throw new Error('Image not found!')
    if (imageToUpdate.author.toHexString() !== userId)
      throw new Error('Unauthorized action')

    const updatedImage = await Image.findOneAndUpdate(
      imageToUpdate._id,
      image,
      { new: true }
    )

    revalidatePath(path)
    return ParseStringify(updatedImage)
  } catch (error) {
    handleError(error)
  }
}

// ========== DELETE IMAGE ===========
export const deleteImage = async (imageId: string) => {
  try {
    await connectToDatabase()
    await Image.findByIdAndDelete(imageId)
  } catch (error) {
    handleError(error)
  } finally {
    redirect('/')
  }
}

// ========== GET IMAGE BY ID ===========
export const getImageById = async (imageId: string) => {
  const populateUser = (query: any) =>
    query.populate({
      path: 'author',
      model: User,
      select: '_id firstName lastName ',
    })
  try {
    await connectToDatabase()

    const image = await populateUser(Image.findById(imageId))

    if (!image) throw new Error('Image not found!')

    return ParseStringify(image)
  } catch (error) {
    handleError(error)
  }
}
