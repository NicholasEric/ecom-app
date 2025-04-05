// app/api/checkout-sessions/create/route.js
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia',
});

export async function POST(request) {
  try {
    const { cartItems } = await request.json();

    const lineItems = cartItems.map(item => ({
      price_data: {
        currency: 'jpy',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 1000,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error(error.message)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}