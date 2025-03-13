"use client";
import { useState } from "react";

export default function OrderTracking() {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [orderDetails, setOrderDetails] = useState([]);
    const [orderStatus, setOrderStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchOrderStatus = async () => {
        if (!trackingNumber) return;
        setLoading(true);
        try {
            const response = await fetch(`https://e-template-server.onrender.com/api/track-order?trackingNumber=${trackingNumber}`);

            if (!response.ok) {
                throw new Error("Failed to fetch order status");
            }
            const data = await response.json();
            setOrderStatus(data.orderDetails.status);
            setOrderDetails(data.orderDetails);
        } catch (error) {
            alert("Failed to fetch order status");
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center min-h-screen p-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Track Your Order</h1>
                <div className="flex w-full gap-2 mb-6">
                    <input
                        type="text"
                        placeholder="Enter tracking number"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <button
                        onClick={fetchOrderStatus}
                        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                        disabled={loading}
                    >
                        {loading ? "Tracking..." : "Track"}
                    </button>
                </div>
                
                {orderStatus !== null && (
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold text-gray-700">Order Status</h2>
                        <div className="relative flex justify-between items-center mt-4">
                            {["Order Placed", "Processing", "Shipped", "Delivered", "Cancelled"].map((step, index) => (
                                <div key={index} className="w-1/5 text-center">
                                    <div className={`w-8 h-8 mx-auto ${index <= orderStatus ? (orderStatus === 4 ? 'bg-red-600' : 'bg-blue-600') : 'bg-gray-300'} text-white rounded-full flex items-center justify-center font-bold`}>
                                        {index < orderStatus ? '✓' : index + 1}
                                    </div>
                                    <p className="text-sm mt-2 text-gray-600">{step}</p>
                                </div>
                            ))}
                            <div className="absolute top-4 left-[10%] w-4/5 h-1" style={{ backgroundColor: orderStatus > 0 && orderStatus !== 4 ? 'rgb(37 99 235)' : 'rgb(209 213 219)' }}></div>
                        </div>
                    </div>
                )}
                
                {orderStatus !== null && (
                    <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                        <h3 className="font-semibold text-gray-700">Order Details</h3>
                        <p className="text-sm text-gray-600 mt-2"><strong>Order ID: </strong> {trackingNumber}</p>
                        <p className="text-sm text-gray-600 mt-2"><strong>Product Name: </strong> {orderDetails.productName}</p>
                        <p className="text-sm text-gray-600 mt-2"><strong>Price: </strong> {orderDetails.price}</p>
                        <p className="text-sm text-gray-600 mt-2"><strong>Quantity: </strong> {orderDetails.quantity}</p>
                        {orderStatus === 4 && <p className="text-sm text-red-600 mt-2 font-bold">This order was cancelled.</p>}
                    </div>
                )}
            </div>
        </div>
    );
}
