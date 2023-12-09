import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    data: [
      {
        id: 1,
        name: 'Jane Doe',
      },
    ],
  });
}
