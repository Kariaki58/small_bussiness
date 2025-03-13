import Image from "next/image";
import Link from "next/link";
import AddToCart from "./AddToCart";
import SortProducts from "./Sort";
import { Suspense } from "react";
import { PaginationDemo } from "./pagination";

export default async function ProductList({ searchParams }) {
    try {
        const queryString = new URLSearchParams(searchParams).toString();
        const response = await fetch(`${process.env.BACKEND_URL}/?${queryString}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching products: ${response.statusText}`);
        }

        const data = await response.json();

        const truncateText = (text, length) => {
            return text.length > length ? text.slice(0, length) + '...' : text;
        };

        return (
            <div className="container mx-auto p-6" id="product-list">
                <Suspense fallback={<div>Loading...</div>}>
                    <SortProducts />
                </Suspense>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {data?.products?.length > 0 ? (
                        data.products.map((product) => (
                            <div 
                                key={product._id} 
                                className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-xl"
                            >
                                <Link href={`/product/${product._id}`}>
                                    <div className="w-full h-72 relative">
                                        <Image 
                                            src={product.images[0]} 
                                            alt={product.name} 
                                            layout="fill"
                                            objectFit="cover" 
                                            className="rounded-t-lg"
                                        />
                                    </div>
                                </Link>
                                <div className="p-4 text-center">
                                    <h2 className="text-lg font-semibold text-gray-800">{truncateText(product.name, 17)}</h2>
                                    <p className="text-gray-600 text-lg font-medium mt-2">₦{product.price}</p>
                                    <AddToCart product={product} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No products found.</p>
                    )}
                </div>
                <div className="my-20">
                    <Suspense fallback={<div>Loading...</div>}>
                        <PaginationDemo total={data.total} />
                    </Suspense>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return (
            <div className="container mx-auto p-6 text-center">
                <p className="text-red-500 text-lg">Failed to load products. Please try again later.</p>
            </div>
        );
    }
}