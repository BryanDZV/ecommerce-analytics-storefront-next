import { NextResponse } from 'next/server';
import { products } from '@/mocks/mockProducts';

export async function GET() {
  return NextResponse.json(products);
}
