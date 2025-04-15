"use client";

import BackButton from "@/components/components/BackButton";
import ContactForm from "@/components/components/ContactForm";
import IProduct from "@/components/interfaces";
import { useProducts } from "@/components/ProductContext";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";

const ProductDetailPage = () => {
  const { id } = useParams(); // works only in 'use client'
  const { products } = useProducts();
  const product: IProduct | undefined = products?.find(
    (p: IProduct | undefined) => p?.id === id
  );

  if (!product) return notFound();

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <BackButton />
      <article>
        {product.Category.map((cat, i) => {
          return (
            <p
              key={`category-${i}`}
              className="inline-block mt-2 px-4 py-1 mx-1 rounded-full bg-gray-300 text-black mb-3"
            >
              {cat}
            </p>
          );
        })}
        <h1 className="text-3xl font-bold mb-4">{product.Name}</h1>
        {/* Image Gallery or larger image */}
        {product.Images?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {product.Images.map(
              (img: { url: string | StaticImport }, i: number) => (
                <div
                  key={i}
                  className="relative w-full h-64 rounded overflow-hidden"
                >
                  <Image
                    src={img.url}
                    alt={`${product.Name} image ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
                  />
                </div>
              )
            )}
          </div>
        )}

        {/* Product Description and Info */}
        <p className="text-lg text-white-700 mb-4">{product.Description}</p>
        <p className="text-xl font-bold">Price: ${product.Price}</p>
        <p
          className={`inline-block mt-2 px-4 py-1 rounded-full ${
            product.Status === "Available"
              ? "bg-green-500 text-white"
              : product.Status === "Pending"
              ? "bg-yellow-300 text-black"
              : "bg-red-400 text-white"
          }`}
        >
          {product.Status}
        </p>
        {/* contact */}
        <ContactForm name={product.Name} />
      </article>
    </main>
  );
};

export default ProductDetailPage;
