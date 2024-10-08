import { Document } from 'mongoose'
import { formSchema } from '@/components/shared/TransformationForm'
import { z } from 'zod'
import { Control } from 'react-hook-form'
import React from 'react'
import { aspectRatioOptions } from '@/constants'

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

declare type TransformationTypeKey =
  | 'restore'
  | 'fill'
  | 'remove'
  | 'recolor'
  | 'removeBackground'

declare type SearchParamProps = {
  params: { id: string; type: TransformationTypeKey }
  searchParams: { [key: string]: string | string[] | undefined }
}

declare type Transformations = {
  restore?: boolean
  fillBackground?: boolean
  remove?: {
    prompt: string
    removeShadow?: boolean
    multiple?: boolean
  }
  recolor?: {
    prompt?: string
    to: string
    multiple?: boolean
  }
  removeBackground?: boolean
}

declare type TransformationFormProps = {
  action: 'Add' | 'Update'
  userId: string
  type: TransformationTypeKey
  creditBalance: number
  data?: IImage | null
  config?: Transformations | null
}

declare type CustomFormFieldProps = {
  control: Control<z.infer<typeof formSchema>> | undefined
  render: (props: { field: any }) => React.ReactNode
  name: keyof z.infer<typeof formSchema>
  formLabel?: string
  className?: string
}

declare type AspectRatioKey = keyof typeof aspectRatioOptions

declare type MediaUploaderProps = {
  onValueChange: (value: string) => void
  setImage: React.Dispatch<any>
  publicId: string
  image: any
  type: string
}
