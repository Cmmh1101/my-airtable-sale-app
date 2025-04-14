'use client';

import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white dark:bg-black shadow-md py-4 px-6 sticky top-0 z-80">
      <div className="max-w-7xl mx-auto flex justify-center items-center">
        <Link href="/" className="text-3xl font-bold text-pink-600 tracking-wide">
          🏷️ Moving Sale
        </Link>
        {/* <nav className="space-x-4 text-sm font-medium">
          <Link href="/" className="hover:text-pink-600 transition">Home</Link>
          <Link href="/products" className="hover:text-pink-600 transition">Products</Link>
        </nav> */}
      </div>
    </header>
  );
};

export default Header;