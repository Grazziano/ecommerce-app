import { NextRequest, NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: reqBody.amount,
      currency: 'usd',
      description: 'DevShop payment',
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
