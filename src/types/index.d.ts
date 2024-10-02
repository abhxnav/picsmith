import { Document } from 'mongoose'

// ========== MODELS' INTERFACES ==========

export interface IImage extends Document {
  title: string
  transformationType: string
  publicId: string
  secureUrl: string
  width?: number
  height?: number
  config?: object
  transformationUrl?: string
  aspectRatio?: string
  color?: string
  prompt?: string
  author: { _id: string; firstName: string; lastName: string }
  createdAt?: Date
  updatedAt?: Date
}

export interface IUser extends Document {
  clerkId: string
  email: string
  username: string
  photo: string
  firstName?: string
  lastName?: string
  planId?: number
  creditBalance?: number
}

export interface ITransaction extends Document {
  createdAt: Date
  stripeId: string
  amount: number
  plan?: string
  credits?: number
  buyer?: IUser
}

// ========== USER PARAMS ==========

declare type CreateUserParams = {
  clerkId: string
  email: string
  username: string
  firstName: string
  lastName: string
  photo: string
}

declare type UpdateUserParams = {
  firstName: string
  lastName: string
  username: string
  photo: string
}
