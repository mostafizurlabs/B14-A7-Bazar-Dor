
import { IProduct } from "@/types/type";
import { notFound } from "next/navigation";
import Link from "next/link";

const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

const ProductDetailsPage = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await params;

    const productsResponse = await fetch(`${BASE_URL}/products`, {
        cache: "no-store",
    });

    if (!productsResponse.ok) {
        throw new Error("Failed to fetch products");
    }

    const productsResult = await productsResponse.json();
    const products: IProduct[] = productsResult;
    console.log("Products API Data:", productsResult);

    const selectedProduct = products.find(
        (product) => product.slug === slug
    );

    if (!selectedProduct) {
        notFound();
    }

    const response = await fetch(
        `${BASE_URL}/products/${selectedProduct.id}`,
        { cache: "no-store" }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch product details");
    }

    const result = await response.json();
    const product: IProduct = result;
    console.log("Product Details API Data:", result);
    const markets = product.markets ?? [];

const minPrice = markets.length
    ? Math.min(...markets.map((market) => market.min))
    : product.today;

const maxPrice = markets.length
    ? Math.max(...markets.map((market) => market.max))
    : product.today;

const averagePrice = markets.length
    ? markets.reduce(
        (total, market) => total + (market.min + market.max) / 2,
        0
    ) / markets.length
    : product.today;

const unitBn: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    liter: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
    pcs: "পিস",
};

    return (
        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <Link
                href="/"
                className="mb-6 inline-block font-semibold text-[#078C43] hover:underline"
            >
                ← হোম পেজে ফিরে যান
            </Link>

            <div className="grid grid-cols-1 gap-8 rounded-3xl border border-[#DDE7DE] bg-[#FAFCFA] p-5 shadow-sm md:grid-cols-2 md:p-8">


         {/* Product Image */}
<div className="flex items-center justify-center rounded-2xl bg-white p-6">
    <span className="text-9xl" role="img" aria-label={product.nameBn}>
        {product.image}
    </span>
</div>
                {/* Product Information */}
                <div className="flex flex-col justify-center">
                    <p className="mb-3 font-semibold text-[#078C43]">
                        {product.categoryIcon} {product.categoryNameBn}
                    </p>

                    <h1 className="text-3xl font-bold text-[#1F2923]">
                        {product.nameBn}
                    </h1>

                    <p className="mt-3 text-gray-500">
                        একক: {product.unit}
                    </p>

                    {/* Current Price */}
                    <div className="mt-6 rounded-2xl bg-green-50 p-5">
                        <p className="text-sm text-gray-600">
                            বর্তমান দাম
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-[#078C43]">
                            ৳{product.today.toLocaleString("bn-BD")}
                        </h2>
                    </div>

                    {/* Market Price Summary */}
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="rounded-xl border border-[#DDE7DE] bg-white p-4">
                            <p className="text-sm text-gray-500">
                                সর্বনিম্ন দাম
                            </p>
                            <p className="mt-2 text-xl font-bold text-green-600">
                                ৳{minPrice.toLocaleString("bn-BD")} / {unitBn[product.unit] ?? product.unit}
                            </p>
                        </div>

                        <div className="rounded-xl border border-[#DDE7DE] bg-white p-4">
                            <p className="text-sm text-gray-500">
                                সর্বোচ্চ দাম
                            </p>
                            <p className="mt-2 text-xl font-bold text-red-600">
                                ৳{maxPrice.toLocaleString("bn-BD")} / {unitBn[product.unit] ?? product.unit}
                            </p>
                        </div>

                        <div className="rounded-xl border border-[#DDE7DE] bg-white p-4">
                            <p className="text-sm text-gray-500">
                                গড় দাম
                            </p>
                            <p className="mt-2 text-xl font-bold text-[#078C43]">
                                ৳{averagePrice.toLocaleString("bn-BD", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })} / {unitBn[product.unit] ?? product.unit}
                            </p>
                        </div>
                    </div>

                    {/* Price History */}
                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="rounded-xl border border-[#DDE7DE] p-4">
                            <p className="text-sm text-gray-500">
                                গতকালের দাম
                            </p>
                            <p className="mt-2 font-bold">
                                ৳{product.yesterday.toLocaleString("bn-BD")}
                            </p>
                        </div>

                        <div className="rounded-xl border border-[#DDE7DE] p-4">
                            <p className="text-sm text-gray-500">
                                গত সপ্তাহের দাম
                            </p>
                            <p className="mt-2 font-bold">
                                ৳{product.lastWeek.toLocaleString("bn-BD")}
                            </p>
                        </div>

                        <div className="rounded-xl border border-[#DDE7DE] p-4">
                            <p className="text-sm text-gray-500">
                                গত মাসের দাম
                            </p>
                            <p className="mt-2 font-bold">
                                ৳{product.lastMonth.toLocaleString("bn-BD")}
                            </p>
                        </div>

                        <div className="rounded-xl border border-[#DDE7DE] p-4">
                            <p className="text-sm text-gray-500">
                                দামের পরিবর্তন
                            </p>
                            <p className={`mt-2 font-bold ${
                                product.change.dir === "up"
                                    ? "text-red-600"
                                    : product.change.dir === "down"
                                    ? "text-green-600"
                                    : "text-gray-600"
                            }`}>
                                {product.change.dir === "up"
                                    ? "↑"
                                    : product.change.dir === "down"
                                    ? "↓"
                                    : "−"}{" "}
                                {product.change.pct}%
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Market Information */}
            {product.markets?.length > 0 && (
                <section className="mt-10">
                    <h2 className="mb-5 text-2xl font-bold text-[#1F2923]">
                        বাজারভিত্তিক দাম
                    </h2>

                    <div className="overflow-x-auto rounded-2xl border border-[#DDE7DE]">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[#F0F6F0]">
                                <tr>
                                    <th className="p-4">বাজার</th>
                                    <th className="p-4">বিভাগ</th>
                                    <th className="p-4">সর্বনিম্ন দাম</th>
                                    <th className="p-4">সর্বোচ্চ দাম</th>
                                </tr>
                            </thead>

                            <tbody>
                                {product.markets.map((market, index) => (
                                    <tr
                                        key={index}
                                        className="border-t border-[#DDE7DE]"
                                    >
                                        <td className="p-4 font-medium">
                                            {market.market}
                                        </td>
                                        <td className="p-4">
                                            {market.division}
                                        </td>
                                        <td className="p-4 text-green-600">
                                            ৳{market.min.toLocaleString("bn-BD")}
                                        </td>
                                        <td className="p-4 text-red-600">
                                            ৳{market.max.toLocaleString("bn-BD")}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}
        </main>
    );
};

export default ProductDetailsPage;
