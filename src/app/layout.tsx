import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ProductsProvider } from "../ProductContext";
import Header from "../components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moving Sale App",
  description: "Explore and shop gently used items from our moving sale! Browse a curated selection of furniture, home goods, electronics, and more. Everything must go—don't miss out on great deals!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <ProductsProvider>
          <Header />
          {children}
          {/* <footer className="w-100vw row-start-3 flex gap-[24px] flex-wrap items-center justify-center absolute bottom-0 mx-auto">
        <Link
          href="/"
          className="text-3xl font-bold text-pink-600 tracking-wide"
        >
          🏷️ Moving Sale
        </Link>
      </footer> */}
        </ProductsProvider>
      </body>
    </html>
  );
}
