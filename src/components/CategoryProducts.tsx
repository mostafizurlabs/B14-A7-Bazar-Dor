"use client";

import { IProduct } from "@/types/type";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";

const CategoryProducts = ({ products }: { products: IProduct[] }) => {
  const [sortBy, setSortBy] = useState<string>("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-asc") {
      return a.today - b.today;
    }

    if (sortBy === "price-desc") {
      return b.today - a.today;
    }

    return 0;
  });

  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold text-[#1D271F]">
          কোনো পণ্য পাওয়া যায়নি!
        </h2>

        <p className="mt-2 text-[#1D271F]/60">
          এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
        </p>

        <Link
          href="/"
          className="mt-5 inline-block rounded-[10px] bg-[#05893E] px-6 py-3 text-[#F3FBF4]"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <section className="py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-[#1D271F]">
          এই ক্যাটাগরির পণ্যসমূহ
        </h2>

        <div className="flex items-center gap-2">
          <span className="text-sm text-[#1D271F]/60">সাজান:</span>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-[10px] border border-[#E1E8E1] bg-[#FAFCFA] px-3 py-2 text-sm text-[#1D271F] outline-none"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price-asc">দাম: কম থেকে বেশি</option>
            <option value="price-desc">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default CategoryProducts;