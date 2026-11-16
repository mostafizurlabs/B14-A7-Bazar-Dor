
import Link from "next/link";
import { Home, ShoppingBasket } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
        <ShoppingBasket className="h-12 w-12 text-green-600" />
      </div>

      <h1 className="text-7xl font-bold text-green-600">
        404
      </h1>

      <h2 className="mt-4 text-2xl font-bold text-gray-800">
        Page Not Found!
      </h2>

      <p className="mt-3 max-w-md text-gray-500">
        দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি।
        অনুগ্রহ করে হোম পেজে ফিরে যান।
      </p>

      <Link
        href="/"
        className="mt-7 inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
      >
        <Home size={20} />
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
};

export default NotFound;
