"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";


export default function SizeDisplay({ sizes }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    
    const selectedSize = searchParams.get("size") || "";

    const updateSize = (size) => {
        const params = new URLSearchParams(searchParams);
        if (size) {
            params.set("size", size);
        } else {
            params.delete("size");
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const buttonClassNames = (isSelected) =>
        `px-4 py-2 rounded-lg border ${isSelected ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'} hover:bg-blue-500 hover:text-white transition-all`;
    
    return (
        <div className="mb-4">
            <h2 className="text-md text-gray-800 lg:text-xl font-semibold mb-2">Available Sizes</h2>
            <div className="flex flex-wrap gap-2">
                {sizes.map((size, index) => (
                    <button
                        key={index}
                        onClick={() => updateSize(size)}
                        className={buttonClassNames(selectedSize === size)}
                    >
                        {size}
                    </button>
                ))}
            </div>
        </div>
    );
}
