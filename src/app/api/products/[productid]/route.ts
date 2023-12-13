import { connectDB } from '@/configs/dbConfig';
import { validateJWT } from '@/helpers/validateJWT';
import Product from '@/models/productModel';
import { NextRequest, NextResponse } from 'next/server';

connectDB();

interface ProductIdParams {
  params: {
    productid: string;
  };
}

export async function GET(_request: NextRequest, { params }: ProductIdParams) {
  try {
    const product = await Product.findById(params.productid);

    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: ProductIdParams) {
  try {
    await validateJWT(request);

    const reqBody = await request.json();

    await Product.findByIdAndUpdate(params.productid, reqBody);

    return NextResponse.json({ message: 'Product updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: ProductIdParams
) {
  try {
    await validateJWT(request);

    await Product.findByIdAndDelete(params.productid);

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
