import { getProducts } from "@/components/lib/airtable";
import { Key } from "react";
import Image from "next/image";

const ProductPage = async () => {
  const products = await getProducts();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(
          (product: {
            id: Key | null | undefined;
            Product_Name: string;
            Images: { url: string | undefined }[];
            Description: string | undefined;
            Price: number;
            Status: string;
          }) => (
            <div key={product.id} className="p-4 border rounded shadow flex flex-col justify-between">
              <div>
                <h2 className="text-xl capitalize font-semibold">
                  {product.Product_Name}
                </h2>
                {product.Images?.[0]?.url && (
                  <Image
                    src={product.Images[0].url}
                    alt={product.Product_Name}
                    className="rounded"
                    width={180}
                    height={38}
                    priority
                  />
                )}
                <p className="mt-2 text-gray-300">{product.Description}</p>
            </div>
            <div className="font-bold text-xl mt-3">
              <p>Price: ${product.Price}</p>
              <p
                className={`text-center rounded-3xl mt-1 ${
                  product.Status === "Pending"
                    ? "bg-amber-300 text-black"
                    : product.Status === "Available"
                    ? "bg-green-500 text-black"
                    : product.Status === "Sold" && "bg-red-400 text-black"
                }`}
              >
                {product.Status}
                </p>
            </div>
            </div>
          )
        )}
      </div>
    </main>
  );
};

export default ProductPage;
