"use client";

import { IProduct } from "@/types/type";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const TopFallers = () => {
  const [topFallers, setTopFallers] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const result = await res.json();
        const data: IProduct[] = Array.isArray(result)
          ? result
          : result.data || [];

        const filteredData = data
          .filter((item) => item.change.dir === "down")
          .sort((a, b) => a.change.pct - b.change.pct)
          .slice(0, 6);

        setTopFallers(filteredData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <section className="w-full bg-[#F0F5F0] py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-5">
            <h2 className="flex items-center gap-2 text-xl font-extrabold text-[#1D271F] sm:text-2xl">
              <span className="text-base text-[#1A9951]">▼</span>
              <span>আজ দাম কমেছে</span>
            </h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, idx) => (
                <div
                  key={idx}
                  className="h-52 animate-pulse rounded-3xl bg-[#DDE7DE]"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {topFallers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TopFallers;