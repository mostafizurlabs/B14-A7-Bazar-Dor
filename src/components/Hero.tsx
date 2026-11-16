
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function HeroSection() {
  const [todayDate, setTodayDate] = useState("");

  // Bengali Date
  useEffect(() => {
    const date = new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());

    setTodayDate(date);
  }, []);

  return (
    <section className="mx-auto max-w-5xl py-6">
      <div className="flex h-[280px] flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl border border-[#DDE7DE] bg-[#FAFCFA] px-6 sm:h-[300px] sm:flex-row sm:justify-between sm:gap-8 sm:px-10">

        {/* Text Content */}
        <div className="flex min-w-0 flex-1 flex-col items-start">
          {todayDate && (
            <span className="rounded-full bg-[#E8F4EB] px-3 py-1 text-xs font-semibold text-[#1F2923]">
              {todayDate}
            </span>
          )}

          <h1 className="mt-3 text-2xl font-extrabold text-[#1F2923] sm:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#4D5A51]">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <Link
            href="/#সব-পণ্য"
            className="mt-4 rounded-lg bg-[#078C43] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#067638]"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

        {/* Illustration */}
        <div className="relative h-24 w-36 shrink-0 sm:h-48 sm:w-64">
          <Image
            src="/image/bazar-hero.png"
            alt="ফল ও সবজির ঝুড়ি"
            fill
            sizes="(min-width: 640px) 256px, 144px"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
