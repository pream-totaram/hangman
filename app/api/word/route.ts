import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ word: "Ender's Game", message: "Ender's Game" });
}
