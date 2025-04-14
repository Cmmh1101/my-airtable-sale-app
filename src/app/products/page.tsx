"use client";

import Image from "next/image";
import IProduct from "@/components/interfaces";
import { useProducts } from "@/components/ProductContext";
import { useState } from "react";
import Link from "next/link";

const ProductPage = () => {
  const { products, categories, loading } = useProducts();
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredProducts =
    activeTags.length === 0
      ? products
      : products.filter((product) =>
          product.Category?.some((cat: string) => activeTags.includes(cat))
        );

  if (loading) return <p>Loading...</p>;

  return (
    <main className="p-6v main-wrapper">
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => {
          const isActive = activeTags.includes(cat);
          return (
            <button
              key={cat}
              onClick={() => toggleTag(cat)}
              className={`px-3 py-1 text-sm rounded-full border transition hover:cursor-pointer ${
                isActive
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {cat} {isActive && "✕"}
            </button>
          );
        })}
      </div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map((product: IProduct) => (
          <Link key={product.id} href={`/products/${product.id}`} className="product-box">
            <div
              key={product.id}
              className="p-4 border rounded shadow flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl capitalize font-semibold">
                  {product.Name}
                </h2>

                {product.Images?.[0]?.url && (
                  <div className="relative w-full h-48 mt-2 rounded overflow-hidden">
                    <Image
                      src={product.Images[0].url}
                      alt={product.Name}
                      className="object-cover"
                      fill
                      priority
                    />
                  </div>
                )}
                {/* <p className="mt-2 text-gray-300">{product.Description}</p> */}
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
          </Link>
        ))}
      </div>
    </main>
  );
};

export default ProductPage;
