import { createTransaction } from '@/lib/actions/transaction.action'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export const POST = async (request: Request) => {
  const body = await request.text()

  const sign = request.headers.get('stripe-signature') as string
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event

  try {
    event = Stripe.webhooks.constructEvent(body, sign, endpointSecret)
  } catch (error) {
    return NextResponse.json({ message: 'Webhook error', error })
  }

  const eventType = event.type

  if (eventType === 'checkout.session.completed') {
    const { id, amount_total, metadata } = event.data.object

    const transaction = {
      stripeId: id,
      amount: amount_total ? amount_total / 100 : 0,
      plan: metadata?.plan || '',
      credits: Number(metadata?.credits) || 0,
      buyerId: metadata?.buyerId || '',
      createdAt: new Date(),
    }

    const newTransaction = await createTransaction(transaction)
    return NextResponse.json({ message: 'OK', transaction: newTransaction })
  }

  return new Response('', { status: 200 })
}
