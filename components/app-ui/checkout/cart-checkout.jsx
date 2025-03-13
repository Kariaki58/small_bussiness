"use client";
import useCartStore from "@/store/cartStore";
import CheckoutForm from "./checkout-form";

export default function CartCheckout() {
    const { cart, removeFromCart } = useCartStore();

    // Calculate total price
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <>
            <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Checkout</h1>
                <div className="border-t border-gray-300 pt-4">
                    <h2 className="text-lg font-semibold text-gray-700 mb-3">Products</h2>
                    {cart.length === 0 ? (
                        <p className="text-gray-500">Your cart is empty.</p>
                    ) : (
                        cart.map((item) => (
                            <div key={item._id} className="flex justify-between items-center border-b py-3">
                                <div>
                                    <p className="text-lg font-medium text-gray-900">{item.name}</p>
                                    <p className="text-gray-600">₦{item.price}</p>
                                    <p className="text-gray-500 text-sm">Size: {item.sizes}</p>
                                    <p className="text-gray-500 text-sm">Color: {item.colors}</p>
                                    <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
                                </div>
                                <button 
                                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                    onClick={() => removeFromCart(item._id)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    )}
                </div>
                {cart.length > 0 && (
                    <div className="mt-4 text-right">
                        <p className="text-xl font-semibold text-gray-800">Total: ₦{total.toFixed(2)}</p>
                    </div>
                )}
            </div>
            <CheckoutForm total={total} />
        </>
    );
}
