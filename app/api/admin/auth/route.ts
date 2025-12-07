import { NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!ADMIN_PASSWORD) {
  throw new Error('Missing ADMIN_PASSWORD environment variable.');
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const userPassword = payload?.password;

    if (typeof userPassword !== 'string' || !userPassword.trim()) {
      return NextResponse.json({ message: 'Password is required.' }, { status: 400 });
    }

    if (userPassword !== ADMIN_PASSWORD) {
      return NextResponse.json({ message: 'Wrong password.' }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true });
  } catch (error) {
    console.error('Failed to authenticate admin', error);
    return NextResponse.json({ message: 'Unable to authenticate.' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Use POST to authenticate.' }, { status: 405 });
}
