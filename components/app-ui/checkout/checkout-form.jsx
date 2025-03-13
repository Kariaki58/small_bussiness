"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useCartStore from "@/store/cartStore";

export default function CheckoutForm({ total }) {
    const { cart, clearCart } = useCartStore();
    const [shippingDetails, setShippingDetails] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
        country: "",
    });
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("payStack");
    const [loading, setLoading] = useState(false);
    const [PaystackPop, setPaystackPop] = useState(null); // Store SDK in state
    const router = useRouter();

    useEffect(() => {
        import("@paystack/inline-js").then((module) => {
            setPaystackPop(() => module.default); // Set Paystack SDK in state
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShippingDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedPaymentMethod === "payStack") {
            handlePaystackPayment();
        }
    };

    const handlePaystackPayment = () => {
        if (!PaystackPop) {
            alert("Payment SDK not loaded. Please try again.");
            return;
        }

        const totalAmount = total * 100; // Convert to kobo
        const paystack = new PaystackPop();

        paystack.newTransaction({
            key: process.env.NEXT_PUBLIC_PAYSTACK_KEY,
            email: shippingDetails.email,
            amount: totalAmount,
            onSuccess: async (transaction) => {
                try {
                    const response = await fetch(`https://e-template-server.onrender.com/order/add`, {
                        body: JSON.stringify({
                            shippingDetails,
                            cart,
                            status: transaction.status,
                            totalAmount,
                        }),
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    alert("Payment successful!");
                    clearCart(); // Clear the cart after payment
                    router.push("/");
                } catch (error) {
                    alert("Payment verification failed");
                }
            },
            onCancel: () => {
                alert("Payment cancelled");
            },
        });
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg my-10">
            <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.keys(shippingDetails).map((field) => (
                        <div key={field} className="mb-4">
                            <label className="block text-gray-700">{field.toUpperCase()}</label>
                            <input
                                type="text"
                                name={field}
                                value={shippingDetails[field]}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md"
                                required
                            />
                        </div>
                    ))}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500 mt-4"
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Pay Now"}
                </button>
            </form>
        </div>
    );
}
