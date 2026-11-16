
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateUser, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    const [name, setName] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("আপনার নাম লিখুন");
            return;
        }

        try {
            setIsUpdating(true);

            const { error } = await updateUser({
                name: name.trim(),
            });

            if (error) {
                toast.error(error.message || "নাম আপডেট করা যায়নি");
                return;
            }

            toast.success("নাম সফলভাবে আপডেট হয়েছে");
            router.push("/profile");
        } catch {
            toast.error("নাম আপডেট করা যায়নি");
        } finally {
            setIsUpdating(false);
        }
    };

    if (isPending) return <p className="p-8">লোড হচ্ছে...</p>;

    if (!session?.user) return null;

    return (
        <main className="min-h-screen bg-[#F0F5F0] px-4 py-10 sm:px-6">
            <div className="mx-auto max-w-4xl">
                <section className="rounded-2xl border border-[#DDE7DE] bg-white p-5 shadow-sm sm:p-8">
                    <h1 className="text-3xl font-bold text-[#1F2923]">
                        তথ্য আপডেট
                    </h1>

                    <p className="mt-2 text-gray-600">
                        আপনার প্রোফাইলের নাম পরিবর্তন করুন।
                    </p>

                    <form onSubmit={handleUpdate} className="mt-8">
                        <label className="mb-2 block font-semibold text-[#1F2923]">
                            নাম
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={session.user.name || "আপনার নাম লিখুন"}
                            className="w-full rounded-xl border border-[#DDE7DE] px-4 py-3 outline-none focus:border-[#078C43]"
                        />

                        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                            <button
                                type="submit"
                                disabled={isUpdating}
                                className="rounded-xl bg-[#078C43] px-8 py-3 font-semibold text-white transition hover:bg-[#056B33] disabled:opacity-60"
                            >
                                {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
                            </button>

                            <Link
                                href="/profile"
                                className="rounded-xl border border-[#DDE7DE] px-8 py-3 text-center font-semibold text-[#1F2923] hover:bg-gray-50"
                            >
                                ফিরে যান
                            </Link>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    );
}
