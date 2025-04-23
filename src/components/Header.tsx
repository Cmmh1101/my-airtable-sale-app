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
        <p>Spring Hill, TN</p>
        {/* <nav className="space-x-4 text-sm font-medium">
          <Link href="/" className="hover:text-pink-600 transition">Home</Link>
          <Link href="/contact" className="hover:text-pink-600 transition">Contact</Link>
        </nav> */}
      </div>
    </header>
  );
};

export default Header;