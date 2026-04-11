import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const { date } = body;

  return NextResponse.json({
    result: `Ты родился(ась) ${date}. В отношениях тебе важна глубина и стабильность.`
  });
}