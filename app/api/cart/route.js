
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import dbConnect from '../../../lib/dbConnect';
import Order from '@/models/Cart'


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia',
});

export async function POST(request) {
  const { productId, amount } = await request.json();

  await dbConnect();

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 1000, 
      currency: 'jpy',
    });

    const order = new Order({
      product: productId,
      amount,
      paymentStatus: 'Pending'
    });
    await order.save();

    return NextResponse.json({ clientSecret: paymentIntent.client_secret }, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error.message);
    return NextResponse.json({ error: "Server Error: Unable to create order" }, { status: 500 });
  }
}
