import ProductPage from "./products/page";

export default function Home() {
  return (
      <main className="flex flex-col gap-[32px] row-start-2 items-center justify-center py-10">
        <ProductPage />
      </main>
  );
}
