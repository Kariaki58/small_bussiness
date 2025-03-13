import CategoryButton from "./CategoryButtons";
import { Suspense } from "react";
import Link from "next/link";

export default async function ProductDisplayCategory({ searchParams }) {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/category`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`Error fetching categories: ${response.statusText}`);
        }

        const data = await response.json();
        const activeCategory = searchParams?.category || "ALL";

        return (
            <div className="bg-gray-100 rounded-lg">
                <h2 className="text-2xl text-gray-800 font-bold mb-2 text-center pt-7">Shop by Category</h2>
                <div className="flex overflow-x-auto whitespace-nowrap no-scrollbar">
                    <Link href="/" className={`group flex items-center justify-center relative flex-shrink-0 w-40 h-20 overflow-hidden rounded-lg p-2 m-2 cursor-pointer ${
                        activeCategory === "ALL" ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'
                    }`}>
                        <h2>ALL</h2>
                    </Link>
                    <div className="flex" style={{ scrollBehavior: 'smooth' }}>
                        {data.length > 0 ? (
                            data.map((category) => (
                                <Suspense key={category._id} fallback={<p>Loading...</p>}>
                                    <CategoryButton key={category._id} category={category} />
                                </Suspense>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 p-4">No categories found.</p>
                        )}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        return (
            <div className="bg-gray-100 rounded-lg text-center p-6">
                <p className="text-red-500 text-lg">Failed to load categories. Please try again later.</p>
            </div>
        );
    }
}