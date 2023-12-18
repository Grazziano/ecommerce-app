import { connectDB } from '@/configs/dbConfig';
import { validateJWT } from '@/helpers/validateJWT';
import { ProductInterface } from '@/interfaces';
import Product from '@/models/productModel';
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

    // fetch all review for the product and calculate the average rating
    const reviews = await Review.find({ product: reqBody.product });
    let averageRating =
      reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
      reviews.length;

    // update the product with the new rating
    await Product.findByIdAndUpdate(reqBody.product, { rating: averageRating });

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

    const reviews = await Review.find({ product })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    return NextResponse.json(reviews);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
