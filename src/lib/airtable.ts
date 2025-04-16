export async function getProducts(isServer = false) {
  const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID!;
  const tableId = process.env.NEXT_PUBLIC_TABLE_ID!;
  const token = process.env.NEXT_PUBLIC_AIRTABLE_TOKEN!;

  const url = `https://api.airtable.com/v0/${baseId}/${tableId}`;

  const options: RequestInit = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  if (isServer) {
    (options as any).next = { revalidate: 60 };
  }

  const res = await fetch(url, options);

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
