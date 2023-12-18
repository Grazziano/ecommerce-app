import { connectDB } from '@/configs/dbConfig';
import { validateJWT } from '@/helpers/validateJWT';
import Review from '@/models/reviewModel';
import { NextRequest, NextResponse } from 'next/server';

connectDB();

export async function POST(request: NextRequest) {
  try {
    const userId = await validateJWT(request);

    const reqBody = await request.json();

    reqBody.user = userId;

    const newReview = new Review(reqBody);

    await newReview.save();

    return NextResponse.json({
      message: 'Review added successfully',
      review: newReview,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await validateJWT(request);

    const searchParams = request.nextUrl.searchParams;

    const product = searchParams.get('product');

    const reviews = await Review.find({ product });

    return NextResponse.json(reviews);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
