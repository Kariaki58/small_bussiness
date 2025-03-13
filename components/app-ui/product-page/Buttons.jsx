"use client";

import { useSearchParams, useRouter } from "next/navigation";
import useCartStore from "@/store/cartStore";

export default function Buttons({ product }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { addToCart } = useCartStore();

    const size = searchParams.get("size") || null;
    const color = searchParams.get("color") || null;
    const quantity = searchParams.get("quantity") || 1;

    
    const handleAddToCart = () => {
        const hasSize = product.sizes?.length > 0;
        const hasColor = product.colors?.length > 0;

        if ((hasSize && !size)) {
            alert("Please select a size before adding to cart.");
            return;
        }
        if ((hasColor &&!color)) {
            alert("Please select a color before adding to cart.");
            return;
        }
        addToCart(product, quantity, size, color);
    }
    const handleCheckout = () => {
        const hasSize = product.sizes?.length > 0;
        const hasColor = product.colors?.length > 0;

        if ((hasSize && !size)) {
            alert("Please select a size before proceeding to checkout.");
            return;
        }
        if ((hasColor &&!color)) {
            alert("Please select a color before proceeding to checkout.");
            return;
        }
        const params = new URLSearchParams({ productId: product._id });
    
        if (size) params.append("size", size);
        if (color) params.append("color", color);
        if (quantity) params.append("quantity", quantity);
    
        router.push(`/checkout?${params.toString()}`);
    }
    return (
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
                onClick={handleAddToCart}
                className="w-full  bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            >
                Add to Cart
            </button>
            {/* <button
                onClick={handleCheckout}
                className="w-full sm:w-auto bg-gray-950 text-white py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
            >
                Place Order
            </button> */}
        </div>
    )
}