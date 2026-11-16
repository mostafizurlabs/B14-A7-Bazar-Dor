
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Avatar,
  Button,
  Dropdown,
  ProgressCircle,
} from "@heroui/react";
import { UserRound, LogOut } from "lucide-react";
import Image from "next/image";
import { signOut, useSession } from "@/lib/auth-client";
import { ICategory } from "@/types/type";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = useSession();

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [todayDate, setTodayDate] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/categories`);

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await res.json();

        setCategories(
          Array.isArray(data) ? data : data.data || []
        );
      } catch (error) {
        console.error("Categories fetch failed:", error);
      }
    };

    fetchCategories();
  }, [API_URL]);

  // Bengali Date
  useEffect(() => {
    const date = new Intl.DateTimeFormat("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date());

    setTodayDate(date);
  }, []);

  // Sign Out
  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/");
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  // Category Active Check
  const isCategoryActive = (slug: string) => {
    return pathname === `/category/${slug}`;
  };

  // Dropdown Action
  const handleDropdownAction = (key: React.Key) => {
    if (key === "profile") {
      router.push("/profile");
    }

    if (key === "signout") {
      handleSignOut();
    }
  };


   // User Dropdown
  const UserMenu = () => (
    <Dropdown>
      <Button
        variant="ghost"
        aria-label="User menu"
        className="flex h-auto items-center gap-2 rounded-[10px] px-2 py-1"
      >
        <Avatar className="h-8 w-8">
          <Avatar.Image
            src={session?.user?.image || ""}
            alt={session?.user?.name || "User"}
          />
          <Avatar.Fallback>
            {session?.user?.name?.slice(0, 2) || "ব"}
          </Avatar.Fallback>
        </Avatar>

        <span className="hidden max-w-[140px] truncate text-sm font-semibold text-[#1D271F] sm:inline">
          {session?.user?.name}
        </span>

      </Button>

      <Dropdown.Popover>
        <Dropdown.Menu onAction={handleDropdownAction}>
          <Dropdown.Item id="profile">
            <UserRound size={16} />
            প্রোফাইল
          </Dropdown.Item>

          <Dropdown.Item id="signout" className="text-danger">
            <LogOut size={16} />
            লগ আউট
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#DDE7DE] bg-[#FAFCFA]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main Navbar */}
        <div className="flex h-20 items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#078C43]">
              <Image
                src="/image/logo-icon.png"
                alt="বাজার দর"
                width={24}
                height={24}
              />
            </div>

            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-[#1F2923]">
                বাজার দর
              </h1>

              <p className="text-[10px] font-medium text-[#78837C]">
                {todayDate || "প্রতিদিনের বাজারের খবর"}
              </p>
            </div>
          </Link>

          {/* Authentication - Desktop */}
          <div className="hidden items-center gap-4 md:flex">
            {isPending ? (
              <ProgressCircle aria-label="Loading" value={60}>
                <ProgressCircle.Track>
                  <ProgressCircle.TrackCircle />
                  <ProgressCircle.FillCircle />
                </ProgressCircle.Track>
              </ProgressCircle>
            ) : session?.user ? (
              <UserMenu />
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/signin"
                  className="rounded-lg px-3 py-2 text-sm text-[#050606] hover:bg-[#F0F5F0]"
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/signup"
                  className="rounded-lg bg-[#078C43] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#067638]"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>

          {/* Authentication - Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            {isPending ? (
              <span className="h-8 w-8 rounded-full bg-[#E8EFE9] animate-pulse" />
            ) : session?.user ? (
              <UserMenu />
            ) : (
              <>
                <Link
                  href="/signin"
                  className="rounded-lg px-3 py-2 text-xs text-[#050606]"
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/signup"
                  className="whitespace-nowrap rounded-lg bg-[#078C43] px-3 py-2 text-xs font-semibold text-white"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Category Navigation (Desktop) */}
        <nav className="hidden items-center gap-6 border-t border-[#DDE7DE] py-3 lg:flex">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className={`whitespace-nowrap text-sm font-semibold transition ${
                isCategoryActive(category.slug)
                  ? "text-[#078C43]"
                  : "text-[#4D5A51] hover:text-[#078C43]"
              }`}
            >
              {category.icon} {category.nameBn}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

