import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia',
});

/*
export async function GET(request, { params }) {
  try {
    const { sessionId } = await params;

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing session ID' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);

    return NextResponse.json({
      id: session.id,
      amount_total: session.amount_total,
      payment_status: session.payment_status,
      customer_email: session.customer_details.email,
      created: session.created,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
*/
export async function GET(request, { params }) {
  try {
    const { sessionId } = await params;

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing session ID' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId,  {
      expand: ['line_items.data.price.product'],
    });
    const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);

    return NextResponse.json(session);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}