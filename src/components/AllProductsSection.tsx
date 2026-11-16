"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { IProduct } from "@/types/type";

export default function AllProductsSection() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const result = await res.json();
        const data: IProduct[] = Array.isArray(result)
          ? result
          : result.data || [];

        setProducts(data);
      } catch (error) {
        console.error("Error loading all products data:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  return (
    <section id="সব-পণ্য" className="w-full bg-[#F0F5F0] py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-5">
          <h2 className="text-xl font-extrabold text-[#1D271F] sm:text-2xl">
            সব পণ্য
          </h2>

          <p className="mt-1 text-xs font-medium text-[#1D271F]/60 sm:text-sm">
            মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        {/* Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(9)].map((_, idx) => (
              <div
                key={idx}
                className="h-52 animate-pulse rounded-3xl bg-[#E1E8E1]"
              />
            ))}
          </div>
        ) : error ? (
          <p className="py-10 text-center text-sm text-[#1D271F]/60">
            পণ্য লোড করা যায়নি। একটু পরে আবার চেষ্টা করুন।
          </p>
        ) : products.length === 0 ? (
          <p className="py-10 text-center text-sm text-[#1D271F]/60">
            কোনো পণ্য পাওয়া যায়নি।
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}