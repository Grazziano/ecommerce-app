import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const response = NextResponse.json({
    message: 'Logount successful',
  });

  // Remove the cookie
  response.cookies.delete('token');

  return response;
}
