
import Image from "next/image";
import CartCheckout from "@/components/app-ui/checkout/cart-checkout";

export default async function Checkout({ searchParams }) {
    const params = await searchParams
    if (Object.keys(params).length === 0) {
        return <div>
                <CartCheckout />
            </div>
    }
    let data = null
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/products/${params.productId}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`Error fetching categories: ${response.statusText}`);
        }

        data = await response.json();
    } catch (error) {

    }
    return (
        <div className="max-w-3xl mx-auto py-10 px-6">
            <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
            
            <div className="border border-gray-200 rounded-lg shadow-sm p-6 bg-white">
                <div className="flex items-center justify-between border-b pb-4 mb-4">
                    <div className="flex items-center space-x-4">
                        <Image 
                            src={data?.product?.images?.[0] || "/placeholder.jpg"} 
                            alt={data?.product?.name || "Product Image"} 
                            width={80} 
                            height={80} 
                            className="rounded-lg"
                        />
                        <div>
                            <p className="text-lg font-medium">{data?.product?.name}</p>
                            {params.size && <p className="text-sm text-gray-600">Size: {params.size}</p>}
                            {params.color && <p className="text-sm text-gray-600">Color: {params.color}</p>}
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-500">Quantity: {params?.quantity || 1}</p>
                        <p className="text-lg font-semibold">₦{data?.product?.price?.toFixed(2)}</p>
                    </div>
                </div>
            </div>
            
            {/* <CheckoutForm total={data?.product?.price} /> */}
        </div>
    );
}