import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import { connectDB } from '@/configs/dbConfig';
import bcryptjs from 'bcryptjs';

connectDB();

interface Params {
  params: {
    userid: string;
  };
}

export async function GET(request: NextRequest, { params }: Params) {
  const userId = params.userid;

  return NextResponse.json({
    success: true,
    data: [
      {
        id: userId,
        name: 'Jane Doe',
      },
    ],
  });
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const userId = params.userid;

    // check if existing password is correct
    const reqBody = await request.json();
    const user = await User.findOne({ email: reqBody.email });

    const isMatch = await bcryptjs.compare(
      reqBody.password,
      user.password as string
    );

    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid old password' },
        { status: 401 }
      );
    }

    // update password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(reqBody.newPassword, salt);

    reqBody.password = hashedPassword;

    await User.findByIdAndUpdate(userId, reqBody);

    return NextResponse.json(
      { message: 'User updated successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
