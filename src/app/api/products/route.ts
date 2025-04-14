// src/app/api/products/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID!;
  const tableId = process.env.NEXT_PUBLIC_TABLE_ID!;
  const token = process.env.NEXT_PUBLIC_AIRTABLE_TOKEN!;

  const url = `https://api.airtable.com/v0/${baseId}/${tableId}`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Fetch error:', res.status, errorText);
      return NextResponse.json({ error: errorText }, { status: res.status });
    }

    const data = await res.json();

    const products = data.records.map(
      (record: { id: string; fields: Record<string, unknown> }) => ({
        id: record.id,
        ...record.fields,
      })
    );

    return NextResponse.json({ products });
  } catch (err: unknown) {
    console.error('Server error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}