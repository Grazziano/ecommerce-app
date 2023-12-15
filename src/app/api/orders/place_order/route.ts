import { connectDB } from '@/configs/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import Order from '@/models/orderModel';
import { validateJWT } from '@/helpers/validateJWT';

connectDB();

export async function POST(request: NextRequest) {
  try {
    const userId = await validateJWT(request);

    const reqBody = await request.json();

    reqBody.user = userId;

    const order = new Order(reqBody);

    await order.save();

    return NextResponse.json({ message: 'Order placed successfully' });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
