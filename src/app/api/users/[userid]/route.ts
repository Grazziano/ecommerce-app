import { NextRequest, NextResponse } from 'next/server';

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
