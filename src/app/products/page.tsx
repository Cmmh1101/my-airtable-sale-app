"use client";

import Image from "next/image";
import IProduct from "@/components/interfaces";
import { useProducts } from "@/components/ProductContext";
import { useState } from "react";
import SingleProduct from "@/components/components/SingleProduct";

const ProductPage = () => {
  const { products, selectedProduct, setSelectedProduct, categories, loading } = useProducts();
  const [activeTags, setActiveTags] = useState<string[]>([]);
// toggle tag 
  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredProducts =
    activeTags.length === 0
      ? products
      : products?.filter((product) =>
          product.Category?.some((cat: string) => activeTags.includes(cat))
        );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <video
          src="/spinner.webm"
          autoPlay
          loop
          muted
          className="w-24 h-24"
        />
        <p className="mt-4 text-gray-500">Loading products...</p>
      </div>
    );
  }

  return (
    <main className="p-6 flex flex-col justify-center align-top main-wrapper">
      {selectedProduct === undefined ? (
        <>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map((cat) => {
              const isActive = activeTags.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggleTag(cat)}
                  title="Click to add/remove category filter"
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
          <div className="flex flex-wrap justify-center animate-fade-in">
            {filteredProducts?.map((product: IProduct) => (
                <div
                  key={product.id}
                  className="product-box m-3 hover:cursor-pointer p-4 border rounded shadow flex flex-col justify-between"
                  onClick={() => setSelectedProduct(product)}
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
            ))}
          </div>
        </>
      ) : (
        <SingleProduct />
      )}
    </main>
  );
};

export default ProductPage;
