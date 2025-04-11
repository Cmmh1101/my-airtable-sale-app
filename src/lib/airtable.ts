export async function getProducts() {
    const baseId = process.env.AIRTABLE_BASE_ID
    const tableId = process.env.TABLE_ID
    const token = process.env.AIRTABLE_TOKEN
  
    const url = `https://api.airtable.com/v0/${baseId}/${tableId}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Fetch error:', res.status, errorText);
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }

  const data = await res.json();

  return data.records.map((record: { id: any; fields: any }) => ({
    id: record.id,
    ...record.fields,
  }));
}