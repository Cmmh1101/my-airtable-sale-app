export async function getProducts(fetchFresh = false) {
  const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID!;
  const tableId = process.env.NEXT_PUBLIC_TABLE_ID!;
  const token = process.env.NEXT_PUBLIC_AIRTABLE_TOKEN!;

  const url = `https://api.airtable.com/v0/${baseId}/${tableId}`;

  // Avoid revalidation caching if we're showing image URLs
  if (!fetchFresh && typeof window === 'undefined') {
    // ONLY enable revalidate if you know it's safe (i.e., no image URLs )
    // (options as Record<string, unknown>).next = { revalidate: 60 };
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Fetch error:', res.status, errorText);
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }

  const data = await res.json();

  return data.records.map(
    (record: { id: string; fields: Record<string, unknown> }) => ({
      id: record.id,
      ...record.fields,
    })
  );
}