"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Button,
  Card,
  Form,
  Input,
  Label,
  Separator,
  TextField,
} from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";




const SignInPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // Email & Password Login
  const handleSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      setIsLoading(true);

      const { data, error } = await signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "সাইন ইন করা যায়নি!");
        return;
      }

      if (data) {
        toast.success("সফলভাবে সাইন ইন হয়েছে!");
        router.push("/");
        router.refresh();
      }
    } catch {
      toast.error("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  // Google Login
  const handleGoogleSignIn = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      toast.error("Google দিয়ে সাইন ইন করা যায়নি!");
    }
  };

  // GitHub Login
  const handleGitHubSignIn = async () => {
    try {
      await signIn.social({
        provider: "github",
        callbackURL: "/",
      });
    } catch {
      toast.error("GitHub দিয়ে সাইন ইন করা যায়নি!");
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-[#F0F5F0] px-4 py-10">

      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-[#1F2923] sm:text-3xl">
          সাইন ইন
        </h1>

        <p className="mt-2 text-xs text-[#78837C] sm:text-sm">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-[416px] rounded-2xl border border-[#DDE7DE] bg-[#FAFCFA] p-6 shadow-none sm:p-6">
        <Card.Content className="flex flex-col gap-5 p-0">

          {/* Login Form */}
          <Form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-4"
          >
            {/* Email */}
            <TextField
              name="email"
              type="email"
              isRequired
              className="flex w-full flex-col gap-1.5"
            >
              <Label className="text-sm font-medium text-[#26332B]">
                ইমেইল
              </Label>

              <Input
                placeholder="you@example.com"
                className="h-10 w-full rounded-lg border border-[#DCE5DD] bg-transparent px-3 text-sm outline-none"
              />
            </TextField>

            {/* Password */}
            <TextField
              name="password"
              type={isVisible ? "text" : "password"}
              isRequired
              className="flex w-full flex-col gap-1.5"
            >
              <Label className="text-sm font-medium text-[#26332B]">
                পাসওয়ার্ড
              </Label>

              <div className="relative w-full">
                <Input
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  className="h-10 w-full rounded-lg border border-[#DCE5DD] bg-transparent px-3 pr-10 text-sm outline-none"
                />

                <button
                  type="button"
                  onClick={() => setIsVisible(!isVisible)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  aria-label="পাসওয়ার্ড দেখুন বা লুকান"
                >
                  {isVisible ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>
            </TextField>

            {/* Sign In Button */}
            <Button
              type="submit"
              isDisabled={isLoading}
              className="mt-0.5 h-10 w-full rounded-lg bg-[#078C43] text-sm font-semibold text-white shadow-[0_3px_4px_rgba(0,0,0,0.20)] hover:bg-[#067638]"
            >
              {isLoading ? "অপেক্ষা করুন..." : "সাইন ইন"}
            </Button>
          </Form>

          {/* Divider */}
          <div className="flex w-full items-center gap-3">
            <Separator className="flex-1 bg-[#DCE5DD]" />

            <span className="text-xs text-[#66736A]">
              অথবা
            </span>

            <Separator className="flex-1 bg-[#DCE5DD]" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-2">

            {/* Google */}
            <Button
              type="button"
              variant="outline"
              isDisabled={isLoading}
              onClick={handleGoogleSignIn}
              className="h-10 w-full rounded-lg border border-[#DCE5DD] bg-transparent text-xs font-medium text-[#26332B] hover:bg-[#F0F5F0] sm:text-sm"
            >
              <svg className="h-4 w-4" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z" />
                <path fill="#FBBC05" d="M10.5 28.7c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.9-6.1z" />
                <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
              </svg>
              Google দিয়ে চালিয়ে যান
            </Button>

            {/* GitHub */}
            <Button
              type="button"
              variant="outline"
              isDisabled={isLoading}
              onClick={handleGitHubSignIn}
              className="h-10 w-full rounded-lg border border-[#DCE5DD] bg-transparent text-xs font-medium text-[#26332B] hover:bg-[#F0F5F0] sm:text-sm"
            >
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              GitHub দিয়ে চালিয়ে যান
            </Button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-xs text-[#536057] sm:text-sm">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-semibold text-[#078C43] hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </Card.Content>
      </Card>

      {/* Home Page */}
      <Link
        href="/"
        className="mt-6 text-xs text-[#849087] transition-colors hover:text-[#078C43] sm:text-sm"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
};

export default SignInPage;