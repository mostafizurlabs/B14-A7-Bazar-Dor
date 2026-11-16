
import { ICategory, IProduct } from "@/types/type";
import CategoryProducts from "@/components/CategoryProducts";
import { notFound } from "next/navigation";
import Link from "next/link";

const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

const CategoryPage = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await params;

    const [categoryResponse, productsResponse] = await Promise.all([
        fetch(`${BASE_URL}/categories/${slug}`, {
            cache: "no-store",
        }),
        fetch(`${BASE_URL}/products?category=${slug}`, {
            cache: "no-store",
        }),
    ]);

    if (!categoryResponse.ok || !productsResponse.ok) {
        throw new Error("Failed to fetch category data");
    }

    const category: ICategory = await categoryResponse.json();
    const products: IProduct[] = await productsResponse.json();


    if (!category || !category.id) {
        notFound();
    }

    return (
        <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

            {/* Breadcrumb */}
            <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
                <Link href="/" className="hover:text-[#078C43]">
                    হোম
                </Link>

                <span>/</span>

                <span className="font-semibold text-[#078C43]">
                    {category.nameBn}
                </span>
            </div>

            {/* Category Header */}
            <div className="mb-8 rounded-3xl border border-[#DDE7DE] bg-[#FAFCFA] p-6 sm:p-8">
                <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-4xl">
                        {category.icon}
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-[#1F2923] sm:text-3xl">
                            {category.nameBn}
                        </h1>

                        <p className="mt-2 text-sm text-[#78837C]">
                            এই ক্যাটাগরির সকল পণ্যের বাজারদর দেখুন।
                        </p>
                    </div>
                </div>
            </div>

            {/* Category Products */}
            <CategoryProducts products={products} />

        </main>
    );
};

export default CategoryPage;
