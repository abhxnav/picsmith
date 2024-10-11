'use server'

import { connectToDatabase } from '@/lib/database/mongoose'
import User from '@/lib/database/models/user.model'
import { CreateUserParams, UpdateUserParams } from '@/types'
import { handleError, ParseStringify } from '@/lib/utils'
import { revalidatePath } from 'next/cache'

// CREATE
export const createUser = async (user: CreateUserParams) => {
  try {
    await connectToDatabase()

    const newUser = await User.create(user)
    return JSON.parse(JSON.stringify(newUser))
  } catch (error) {
    handleError(error)
  }
}

// READ
export const getUserById = async (userId: string) => {
  try {
    await connectToDatabase()

    const user = await User.findOne({ clerkId: userId })

    if (!user) throw new Error('User not found!')
    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    handleError(error)
  }
}

// UPDATE
export const updateUser = async (userId: string, user: UpdateUserParams) => {
  try {
    await connectToDatabase()

    const updatedUser = User.findOneAndUpdate({ clerkId: userId }, user, {
      new: true,
    })

    if (!updateUser) throw new Error('User update failed')
    return JSON.parse(JSON.stringify(updatedUser))
  } catch (error) {
    handleError(error)
  }
}

// DELETE
export const deleteUser = async (userId: string) => {
  try {
    await connectToDatabase()

    const userToDelete = await User.findOne({ clerkId: userId })
    if (!userToDelete) throw new Error('User not found!')

    const deletedUser = await User.findByIdAndDelete(userToDelete._id)
    revalidatePath('/')

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
  } catch (error) {
    handleError(error)
  }
}

// CREDITS
export const updateCredits = async (userId: string, creditFee: number) => {
  try {
    await connectToDatabase()

    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { creditBalance: creditFee } },
      { new: true }
    )

    if (!updatedUserCredits) throw new Error('User credits update failed')

    return ParseStringify(updatedUserCredits)
  } catch (error) {
    handleError(error)
  }
}
