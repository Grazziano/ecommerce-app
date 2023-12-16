import { connectDB } from '@/configs/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import Order from '@/models/orderModel';
import { validateJWT } from '@/helpers/validateJWT';

connectDB();

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      orderid: string;
    };
  }
) {
  try {
    await validateJWT(request);

    const order = await Order.findById(params.orderid).populate(
      'user',
      'name email'
    );

    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
