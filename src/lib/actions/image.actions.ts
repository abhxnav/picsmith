'use server'

import { AddImageParams, GetAllImagesParams, UpdateImageParams } from '@/types'
import { handleError, parseStringify } from '@/lib/utils'
import { connectToDatabase } from '@/lib/database/mongoose'
import { revalidatePath } from 'next/cache'
import { Image, User } from '@/lib/database/models'
import { redirect } from 'next/navigation'
import { v2 as cloudinary } from 'cloudinary'

// ========== HELPER ===========
const populateUser = (query: any) =>
  query.populate({
    path: 'author',
    model: User,
    select: '_id firstName lastName clerkId',
  })

// =========== ADD IMAGE ===========
export const addImage = async ({ image, userId, path }: AddImageParams) => {
  try {
    await connectToDatabase()

    const author = await User.findById(userId)

    if (!author) throw new Error('Author not found!')

    const newImage = await Image.create({ ...image, author: author._id })

    revalidatePath(path)
    return parseStringify(newImage)
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
    return parseStringify(updatedImage)
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
  try {
    await connectToDatabase()

    const image = await populateUser(Image.findById(imageId))

    if (!image) throw new Error('Image not found!')

    return parseStringify(image)
  } catch (error) {
    handleError(error)
  }
}

// ========== GET ALL IMAGES ===========
export const getAllImages = async ({
  limit = 9,
  page = 1,
  searchQuery = '',
}: GetAllImagesParams) => {
  try {
    await connectToDatabase()
    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    })

    let expression = 'folder=picsmith'

    if (searchQuery) {
      expression += ` AND ${searchQuery}`
    }

    const { resources } = await cloudinary.search
      .expression(expression)
      .execute()

    const resourceIds = resources.map((resource: any) => resource.public_id)

    let query = {}

    if (searchQuery) {
      query = {
        publicId: {
          $in: resourceIds,
        },
      }
    }

    const skipAmount = (Number(page) - 1) * limit

    const images = await populateUser(Image.find(query))
      .sort({ updatedAt: -1 })
      .skip(skipAmount)
      .limit(limit)
    const totalImages = await Image.find(query).countDocuments()
    const savedImages = await Image.find().countDocuments()

    return {
      data: parseStringify(images),
      totalPages: Math.ceil(totalImages / limit),
      savedImages,
    }
  } catch (error) {
    handleError(error)
  }
}

// =========== GET IMAGES BY USER ===========
export const getUserImages = async ({
  limit = 9,
  page = 1,
  userId,
}: {
  limit?: number
  page: number
  userId: string
}) => {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit

    const images = await populateUser(Image.find({ author: userId }))
      .sort({ updatedAt: -1 })
      .skip(skipAmount)
      .limit(limit)

    const totalImages = await Image.find({ author: userId }).countDocuments()

    return {
      data: JSON.parse(JSON.stringify(images)),
      totalPages: Math.ceil(totalImages / limit),
    }
  } catch (error) {
    handleError(error)
  }
}
