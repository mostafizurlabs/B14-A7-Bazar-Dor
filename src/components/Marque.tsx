import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import type { IProduct } from "@/types/type";

const Marque = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );

  const data = await res.json();

  const products: IProduct[] = Array.isArray(data) ? data : data.data || [];

  if (products.length === 0) {
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("bn-BD").format(price);
  };

  const formatPercentage = (percentage: number) => {
    return new Intl.NumberFormat("bn-BD", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(percentage);
  };

  const unitBn: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };

  return (
    <div className="border-b border-[#DDE7DE] bg-white">
      <MarqueeText className="py-2" direction="right" duration={10}>
        {products.map((product) => (
          <Link
            href={`/product/${product.slug}`}
            key={product.id}
            className="flex items-center gap-2 whitespace-nowrap border-r border-[#DDE7DE] px-6 text-sm hover:underline"
          >
            <span className="text-lg">{product.image}</span>

            <span className="font-semibold text-[#1F2923]">
              {product.nameBn}
            </span>

            <span className="text-[#4D5A51]">
              {formatPrice(product.today)} টাকা/
              {unitBn[product.unit] ?? product.unit}
            </span>

            <span
              className={`font-bold ${
                product.change.dir === "up"
                  ? "text-red-600"
                  : product.change.dir === "down"
                    ? "text-green-600"
                    : "text-gray-500"
              }`}
            >
              {product.change.dir === "up"
                ? "▲"
                : product.change.dir === "down"
                  ? "▼"
                  : "—"}{" "}
              {formatPercentage(Math.abs(product.change.pct))}%
            </span>
          </Link>
        ))}
      </MarqueeText>
    </div>
  );
};

export default Marque;

