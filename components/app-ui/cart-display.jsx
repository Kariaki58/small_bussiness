"use client";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useCartStore from "@/store/cartStore";

export default function CartDisplay({ setOpenCart }) {
    const { cart, initializeCart, increaseQuantity, decreaseQuantity, removeFromCart, addToCart } = useCartStore();
    const router = useRouter();

    const GoToCheckout = () => {
        setOpenCart(false);
        router.push("/checkout");
    };

    useEffect(() => {
        initializeCart();
    }, [initializeCart]);

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="fixed top-0 right-0 w-full md:w-[400px] h-full bg-white shadow-lg p-5 flex flex-col z-50">
            <div className="flex justify-between items-center border-b pb-4">
                <h1 className="text-xl font-semibold">Shopping Cart</h1>
                <X size={30} className="cursor-pointer" onClick={() => setOpenCart(false)} />
            </div>
            <div className="flex-1 overflow-y-auto mt-4 space-y-4">
                {cart.length > 0 ? cart.map((item) => (
                    <div key={item._id} className="flex flex-col bg-gray-100 p-3 rounded-lg shadow">
                        <div className="flex items-center justify-between">
                            <Image src={item.images[0]} alt={item.name} width={60} height={60} className="rounded-lg" />
                            <div className="flex-1 ml-3">
                                <h2 className="text-sm font-semibold">{item.name}</h2>
                                <p className="text-gray-600 text-xs">₦{item.price.toFixed(2)}</p>
                                {item.sizes && <p className="text-gray-500 text-xs">Size: {item.sizes}</p>}
                                {item.colors && <p className="text-gray-500 text-xs">Color: {item.colors}</p>}
                            </div>
                            <div className="flex items-center">
                                <button onClick={() => decreaseQuantity(item._id)} className="px-2 py-1 bg-gray-300 rounded">-</button>
                                <p className="mx-2 text-sm">{item.quantity}</p>
                                <button onClick={() => increaseQuantity(item._id)} className="px-2 py-1 bg-gray-300 rounded">+</button>
                            </div>
                            <button onClick={() => removeFromCart(item._id)} className="text-red-500 text-xs">Remove</button>
                        </div>
                        
                    </div>
                )) : (
                    <p className="text-center text-gray-500">Your cart is empty</p>
                )}
            </div>
            {cart.length > 0 && (
                <div className="mt-4 border-t pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                        <span>Total:</span>
                        <span>₦{totalPrice.toFixed(2)}</span>
                    </div>
                    <button onClick={GoToCheckout} className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">Checkout</button>
                </div>
            )}
        </div>
    );
}
