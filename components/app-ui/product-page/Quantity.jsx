"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Minus, Plus } from "lucide-react";

export default function Quantity() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    
    const quantity = Number(searchParams.get("quantity")) || 1;

    const updateQuantity = (newQuantity) => {
        if (newQuantity < 1) return;
        const params = new URLSearchParams(searchParams);
        params.set("quantity", newQuantity);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="mb-6">
            <h2 className="text-lg lg:text-xl font-semibold mb-2 text-gray-800">Quantity</h2>
            <div className="flex items-center gap-2">
                <button 
                    onClick={() => updateQuantity(quantity - 1)} 
                    className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 transition-all"
                >
                    <Minus size={20} className="text-gray-800" />
                </button>
                <span className="text-lg font-medium text-gray-800 min-w-[32px] text-center">
                    {quantity}
                </span>
                <button 
                    onClick={() => updateQuantity(quantity + 1)} 
                    className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 transition-all"
                >
                    <Plus size={20} className="text-gray-800" />
                </button>
            </div>
        </div>
    );
}