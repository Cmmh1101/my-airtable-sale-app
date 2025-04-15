'use client';

import { useProducts } from '../ProductContext';

const BackButton = () => {
  const {setSelectedProduct} = useProducts()

  return (
    <button
      onClick={() => setSelectedProduct(undefined)}
      className="text-blue-500 hover:cursor-pointer underline hover:text-blue-700 mb-10"
    >
      ← Back To Products
    </button>
  );
};

export default BackButton;