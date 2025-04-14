"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getProducts } from "@/components/lib/airtable";
import IProduct from "@/components/interfaces";

interface ProductsContextProps {
  products: IProduct[];
  categories: string[];
  loading: boolean;
  error: string | null;
}

const ProductsContext = createContext<ProductsContextProps | null>(null);

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        const catSet = new Set<string>();
        data.forEach((p: IProduct) =>
          p.Category?.forEach((c: string) => catSet.add(c))
        );
        setCategories(Array.from(catSet));
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, categories, loading, error }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context)
    throw new Error("useProducts must be used within a ProductsProvider");
  return context;
};
