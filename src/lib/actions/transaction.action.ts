'use server'

import { CheckoutTransactionParams, CreateTransactionParams } from '@/types'
import { redirect } from 'next/navigation'
import Stripe from 'stripe'
import { handleError, parseStringify } from '@/lib/utils'
import { connectToDatabase } from '@/lib/database/mongoose'
import { Transaction } from '@/lib/database/models'
import { updateCredits } from '@/lib/actions/user.actions'

export const checkoutCredits = async (
  transaction: CheckoutTransactionParams
) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

  const amount = Number(transaction.amount) * 100
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: amount,
          product_data: {
            name: transaction.plan,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      plan: transaction.plan,
      credits: transaction.credits,
      buyerId: transaction.buyerId,
    },
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
  })

  redirect(session.url!)
}

export const createTransaction = async (
  transaction: CreateTransactionParams
) => {
  try {
    await connectToDatabase()

    const newTransaction = await Transaction.create({
      ...transaction,
      buyer: transaction.buyerId,
    })

    await updateCredits(transaction.buyerId, transaction.credits)

    return parseStringify(newTransaction)
  } catch (error) {
    handleError(error)
  }
}
