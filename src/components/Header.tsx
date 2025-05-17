'use client';

import Link from 'next/link';
import { useProducts } from '../ProductContext';

const Header = () => {
  const {setSelectedProduct} = useProducts()
  return (
    <header className="dark:bg-black shadow-md py-4 px-6 sticky top-0 z-80">
      <div className="max-w-7xl mx-auto flex flex-col justify-center items-center">
        <Link href="/" onClick={() => setSelectedProduct(undefined)} className="text-3xl font-bold text-pink-600 tracking-wide">
          🏷️ Moving Sale
        </Link>
        {/* location */}
        <p>Spring Hill, TN</p>
      </div>
    </header>
  );
};

export default Header;