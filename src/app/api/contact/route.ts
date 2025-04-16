import { NextResponse } from 'next/server';
import { getProducts } from '@/components/lib/airtable';

export async function GET() {
  try {
    const products = await getProducts(true);
    return NextResponse.json({ products });
  } catch (err: unknown) {
    console.error('Server error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}