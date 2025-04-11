import { getProducts } from "@/components/lib/airtable";
import { Key} from "react";
import Image from "next/image";

const ProductPage = async () => {
    const products = await getProducts()

    return (
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-4">Products</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product: { id: Key | null | undefined; Name: string; Images: { url: string | undefined; }[]; Description: string | undefined; }) => (
              <div key={product.id} className="p-4 border rounded shadow">
                <h2 className="text-lg font-semibold">{product.Name}</h2>
                {product.Images?.[0]?.url && (
                <Image
                    className="dark:invert"
                    src={product.Images[0].url}
                    alt={product.Name}
                    // className="mt-2 rounded"
                    width={180}
                    height={38}
                    priority
                />
                )}
                <p className="mt-2 text-gray-700">{product.Description}</p>
              </div>
            ))}
          </div>
        </main>
      )
}

export default ProductPage