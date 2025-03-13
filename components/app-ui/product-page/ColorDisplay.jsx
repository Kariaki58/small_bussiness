"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";


export default function ColorDisplay({ colors }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    
    const selectedColor = searchParams.get("color") || "";

    const updateColor = (color) => {
        const params = new URLSearchParams(searchParams);
        if (color) {
            params.set("color", color);
        } else {
            params.delete("color");
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const buttonClassNames = (isSelected) =>
        `px-4 py-2 rounded-lg border ${isSelected ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'} hover:bg-blue-500 hover:text-white transition-all`;
    
    return (
        <div className="mb-4">
            <h2 className="text-md text-gray-800 lg:text-xl font-semibold mb-2">Available Colors</h2>
            <div className="flex flex-wrap gap-2">
                {colors.map((color, index) => (
                    <button
                        key={index}
                        onClick={() => updateColor(color)}
                        className={buttonClassNames(selectedColor === color)}
                    >
                        {color}
                    </button>
                ))}
            </div>
        </div>
    );
}