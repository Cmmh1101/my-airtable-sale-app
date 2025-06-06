'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import IProduct from './interfaces';

interface ProductsContextType {
  products: IProduct[] | undefined;
  setProducts: (value: IProduct[]) => void
  selectedProduct: IProduct | undefined
  setSelectedProduct: (value: IProduct | undefined) => void
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
  const [selectedProduct, setSelectedProduct] = useState<IProduct | undefined>(undefined)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();

        if (res.ok) {
          const availableProducts = data.products?.filter((prod: IProduct) => prod.Status == "Available")
          setProducts(availableProducts);

          const uniqueCategories = new Set<string>();
          availableProducts.forEach((prod: IProduct) =>
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
    <ProductsContext.Provider value={{ products, setProducts, categories, loading, error, selectedProduct, setSelectedProduct }}>
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