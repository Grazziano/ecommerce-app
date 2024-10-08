import { NextRequest, NextResponse } from 'next/server';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY!);
import Order from '@/models/orderModel';

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const transactionId = reqBody.transactionId;

    const refund = await stripe.refunds.create({
      payment_intent: transactionId,
    });

    // change order status to refunded
    await Order.findOneAndUpdate(
      { _id: reqBody.orderId },
      { paymentStatus: 'refunded' }
    );

    return NextResponse.json({ refund });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
