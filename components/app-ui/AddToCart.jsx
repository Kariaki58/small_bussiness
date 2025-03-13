"use client";
import { useState } from "react";
import useCartStore from "@/store/cartStore";

export default function AddToCartButton({ product }) {
    const { addToCart } = useCartStore();
    const [showOptions, setShowOptions] = useState(false);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");

    const handleAddToCart = () => {
        if (product.sizes?.length || product.colors?.length) {
            setShowOptions(true);
        } else {
            addToCart(product, 1);
        }
    };

    const handleConfirmSelection = () => {
        if (product.sizes?.length && !selectedSize) {
            alert("Please select a size");
            return;
        }
        if (product.colors?.length && !selectedColor) {
            alert("Please select a color");
            return;
        }

        addToCart(product, 1, selectedSize, selectedColor);
        setShowOptions(false);
    };

    return (
        <>
            <button onClick={handleAddToCart} className="cursor-pointer mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Add to Cart
            </button>

            {showOptions && (
                <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-semibold mb-4">Select Options</h2>
                        
                        {product.sizes?.length > 0 && (
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Size:</label>
                                <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md">
                                    <option value="">Select size</option>
                                    {product.sizes.map((size) => (
                                        <option key={size} value={size}>{size}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {product.colors?.length > 0 && (
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Color:</label>
                                <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md">
                                    <option value="">Select color</option>
                                    {product.colors.map((color) => (
                                        <option key={color} value={color}>{color}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="flex justify-end mt-6">
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded mr-2" onClick={() => setShowOptions(false)}>
                                Cancel
                            </button>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" onClick={handleConfirmSelection}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
