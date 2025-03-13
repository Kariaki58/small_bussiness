"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

export default function CategoryButton({ category }) {
        const router = useRouter();
        const searchParams = useSearchParams();
        const productListRef = useRef(null);

        const categoryPrams = searchParams.get("category");
        let activeCategory = categoryPrams ? categoryPrams.replace("-", " ") : "";

        const handleFilterChange = (key, value) => {
            const params = new URLSearchParams(searchParams.toString());
    
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
            activeCategory = value.replace("-", " ");
    
            router.replace(`?${params.toString()}`, { scroll: false });
            setTimeout(() => {
                if (productListRef.current) {
                    productListRef.current.scrollIntoView({ behavior: "smooth" });
                }
            }, 100);
        };


    return (
        <>
            <button onClick={() => handleFilterChange("category", category.name.replace(" ", "-"))} className={`group relative flex-shrink-0 w-40 h-20 overflow-hidden rounded-lg p-2 m-2 cursor-pointer ${
                activeCategory === category.name ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'
            }`}>
                <h2>{category.name}</h2>
            </button>
            <div ref={productListRef} id="product-list"></div>
        </>
    )
}