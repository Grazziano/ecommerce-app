import { connectDB } from '@/configs/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import { validateJWT } from '@/helpers/validateJWT';
import User from '@/models/userModel';

connectDB();

export async function GET(request: NextRequest) {
  try {
    const userId = await validateJWT(request);

    const user = await User.findById(userId).select('-password');

    return NextResponse.json({ data: user });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
