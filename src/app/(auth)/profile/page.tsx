"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { signOut, updateUser, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    const [name, setName] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    const handleSignOut = async () => {
        try {
            await signOut();
            toast.success("সফলভাবে সাইন আউট হয়েছে");
            router.push("/signin");
        } catch {
            toast.error("সাইন আউট করা যায়নি");
        }
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("আপনার নাম লিখুন");
            return;
        }

        try {
            setIsUpdating(true);

            const { error } = await updateUser({ name: name.trim() });

            if (error) {
                toast.error(error.message || "নাম আপডেট করা যায়নি");
                return;
            }

            toast.success("নাম সফলভাবে আপডেট হয়েছে");
            setName("");
        } catch {
            toast.error("নাম আপডেট করা যায়নি");
        } finally {
            setIsUpdating(false);
        }
    };

    if (isPending) {
        return (
            <main className="min-h-screen bg-[#F0F5F0] px-4 py-10">
                <div className="mx-auto max-w-4xl animate-pulse rounded-[20px] bg-[#FAFCFA] p-8">
                    <div className="h-8 w-48 rounded bg-[#E1E8E1]" />
                    <div className="mt-6 h-20 rounded bg-[#E1E8E1]" />
                </div>
            </main>
        );
    }

    if (!session?.user) return null;

    const user = session.user;

    return (
        <main className="min-h-screen bg-[#F0F5F0] px-4 py-10 sm:px-6">
            <div className="mx-auto max-w-4xl space-y-6">

                {/* Page Heading */}
                <div>
                    <h1 className="text-2xl font-bold text-[#1D271F]">
                        আমার প্রোফাইল
                    </h1>
                    <p className="mt-1 text-sm text-[#1D271F]/70">
                        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                    </p>
                </div>

                {/* Card 1: Avatar, Name, Email, Sign out */}
                <section className="rounded-[20px] border border-[#E1E8E1] bg-[#FAFCFA] p-5 sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-[#F0F5F0] text-2xl font-bold text-[#05893E]">
                            {user.image ? (
                                <img
                                    src={user.image}
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                user.name?.charAt(0)?.toUpperCase() || "👤"
                            )}
                        </div>

                        <div className="min-w-0 flex-1">
                            <h2 className="break-words text-lg font-bold text-[#1D271F]">
                                {user.name}
                            </h2>
                            <p className="break-words text-sm text-[#1D271F]/70">
                                {user.email}
                            </p>
                        </div>

                        <button
                            onClick={handleSignOut}
                            className="flex items-center justify-center gap-2 rounded-[10px] border border-[#D03739] px-4 py-2 text-sm font-semibold text-[#D03739] transition hover:bg-[#FFF6F5]"
                        >
                            <LogOut size={16} />
                            সাইন আউট
                        </button>
                    </div>
                </section>

                {/* Card 2: তথ্য + Update form */}
                <section className="rounded-[20px] border border-[#E1E8E1] bg-[#FAFCFA] p-5 sm:p-6">
                    <h2 className="mb-5 text-lg font-bold text-[#1D271F]">তথ্য</h2>

                    <form onSubmit={handleUpdate}>
                        <label
                            htmlFor="name"
                            className="mb-2 block text-sm font-semibold text-[#1D271F]"
                        >
                            নাম
                        </label>

                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={user.name || "আপনার নাম লিখুন"}
                            className="w-full rounded-[10px] border border-[#E1E8E1] bg-[#FAFCFA] px-4 py-3 text-[#1D271F] outline-none focus:border-[#05893E]"
                        />

                        <button
                            type="submit"
                            disabled={isUpdating}
                            className="mt-4 w-full rounded-[10px] bg-[#05893E] px-4 py-3 font-semibold text-[#F3FBF4] transition hover:bg-[#047F39] disabled:opacity-60"
                        >
                            {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
                        </button>
                    </form>
                </section>
            </div>
        </main>
    );
}
