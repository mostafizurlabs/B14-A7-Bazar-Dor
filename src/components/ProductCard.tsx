"use client";

import { IProduct } from "@/types/type";
import { Card, Chip } from "@heroui/react";
import Link from "next/link";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("bn-BD").format(price);
  };

  const formatPercentage = (percentage: number) => {
    return new Intl.NumberFormat("bn-BD", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(Math.abs(percentage));
  };

  const getUnitLabel = (unit: string) => {
    const unitLabels: Record<string, string> = {
      kg: "প্রতি কেজি",
      liter: "প্রতি লিটার",
      litre: "প্রতি লিটার",
      dozen: "প্রতি ডজন",
      piece: "প্রতি পিস",
      pcs: "প্রতি পিস",
    };

    return unitLabels[unit.toLowerCase()] || `প্রতি ${unit}`;
  };

  return (
    <Link href={`/product/${product.slug}`}>
      <Card className="h-full rounded-[20px] border border-[#E1E8E1] bg-[#FAFCFA] p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
        <Card.Content className="flex flex-col gap-4 p-0">


          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#F0F5F0] text-xl">
              {product.image || product.categoryIcon}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-base font-bold text-[#1D271F]">
                {product.nameBn}
              </h3>

              <p className="mt-1 text-xs text-[#1D271F]/60">
                {getUnitLabel(product.unit)}
              </p>
            </div>
          </div>

          <div className="flex items-end justify-between gap-2">
            <div>
              <p className="text-xs font-medium text-[#1D271F]/60">
                আজকের দাম
              </p>

              <p className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-[#1D271F]">
                  {formatPrice(product.today)}
                </span>

                <span className="text-xs font-normal text-[#1D271F]/60">
                  টাকা
                </span>
              </p>
            </div>

      
            <Chip
              size="sm"
              className={`flex h-7 items-center gap-1 rounded-full px-2 text-xs font-bold ${
                isUp
                  ? "bg-[#1A9951]/10 text-[#1A9951]"
                  : isDown
                    ? "bg-[#D03739]/10 text-[#D03739]"
                    : "bg-[#F0F5F0] text-[#1D271F]/60"
              }`}
            >
              {isUp ? "▲" : isDown ? "▼" : "—"}

              {formatPercentage(product.change.pct)}%
            </Chip>
          </div>

        </Card.Content>
      </Card>
    </Link>
  );
};

export default ProductCard;