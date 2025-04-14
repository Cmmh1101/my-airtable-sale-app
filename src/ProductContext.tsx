'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import IProduct from './interfaces';

interface ProductsContextType {
  products: IProduct[];
  categories: string[];
  loading: boolean;
  error: string | null;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();

        if (res.ok) {
          setProducts(data.products);

          const uniqueCategories = new Set<string>();
          data.products.forEach((prod: IProduct) =>
            prod.Category?.forEach((cat: string) => uniqueCategories.add(cat))
          );

          setCategories(Array.from(uniqueCategories));
        } else {
          setError(data.error || 'Failed to fetch products');
        }
      } catch (err: unknown) {
        console.error('Fetch error:', err);
        setError('Something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, categories, loading, error }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = (): ProductsContextType => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};