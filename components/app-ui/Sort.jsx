"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useRef } from "react";


export default function SortProducts() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const productListRef = useRef(null);

    const handleSortChange = (e) => {
        const sortOption = e.target.value;
        const params = new URLSearchParams(searchParams);

        if (sortOption) {
        params.set("sort", sortOption);
        } else {
        params.delete("sort");
        }

        router.replace(`${pathname}?${params.toString()}`);
        setTimeout(() => {
            if (productListRef.current) {
                productListRef.current.scrollIntoView({ behavior: "smooth" });
            }
        }, 100);
    };

    return (
        <>
            <div className="w-full flex justify-center mb-4">
                <select
                    value={searchParams.get("sort") || ""}
                    onChange={handleSortChange}
                    className="text-left bg-white border border-gray-300 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="">Select Sort Option</option>
                    <option value="Highest to Lowest">Highest to Lowest</option>
                    <option value="Lowest to Highest">Lowest to Highest</option>
                    <option value="Latest">Latest</option>
                </select>
            </div>
            <div ref={productListRef} id="product-list"></div>
        </>

    );
}
