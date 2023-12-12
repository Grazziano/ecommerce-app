import { connectDB } from '@/configs/dbConfig';
import { validateJWT } from '@/helpers/validateJWT';
import Category from '@/models/categoryModel';
import { NextRequest, NextResponse } from 'next/server';

connectDB();

interface CategoryIdParams {
  params: {
    categoryid: string;
  };
}

export async function PUT(request: NextRequest, { params }: CategoryIdParams) {
  try {
    await validateJWT(request);

    const reqBody = await request.json();

    await Category.findByIdAndUpdate(params.categoryid, reqBody);

    return NextResponse.json({ message: 'Category updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: CategoryIdParams
) {
  try {
    await validateJWT(request);

    await Category.findByIdAndDelete(params.categoryid);

    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
