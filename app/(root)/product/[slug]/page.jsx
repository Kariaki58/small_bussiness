import ImageDisplay from "@/components/app-ui/product-page/ImageDisplay";
import ColorDisplay from "@/components/app-ui/product-page/ColorDisplay";
import { Star } from "lucide-react";
import SizeDisplay from "@/components/app-ui/product-page/SizeDisplay";
import Quantity from "@/components/app-ui/product-page/Quantity";
import Buttons from "@/components/app-ui/product-page/Buttons";
import { Suspense } from "react";
import Head from "next/head";
import ProductContent from "@/components/app-ui/product-page/ProductContent";
import ProductSchema from "@/components/app-ui/product-page/ProductSchema";

export default async function ProductPage({ params }) {
        const { slug } = await params;
        let data = [];
        const calculateReviewAverage = () => {
            const review = data.review;
            if (!review) return 0;
            if (review.length === 0) return 0;
            const sum = review.reduce((total, data) => total + data.rating, 0);
            const reviewAvg = Number(sum / review.length);
        
            return reviewAvg
        }
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/products/${slug}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            // if (!response.ok) {
            //     throw new Error(`Error fetching product: ${response.statusText}`);
            // }
            data = await response.json();
    
            
        } catch (error) {
            return (
                <div className="container mx-auto p-6 text-center">
                    <p className="text-red-500 text-lg">Failed to load product. Please try again later.</p>
                </div>
            )
        }

        

    return (
        <>
            <Head>
                <title>{data.product.name} - Best Price Online</title>
                <meta name="description" content={data.product.description} />
                <meta name="keywords" content={`ecommerce, buy online, ${data.product.name}, best ${data.product.name} deals, affordable ${data.product.name}, ${data.product.category}, shop ${data.product.name} online, buy ${data.product.name} now, fast shipping ${data.product.name}, high-quality ${data.product.name}, ${data.product.name} price, order ${data.product.name}`} />
            </Head>
            <div className="py-3 px-2 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 px-2 sm:px-4 md:px-5 lg:px-0 lg:grid-cols-2 gap-8">
                        <ImageDisplay images={data.product.images} />
                        <div className="flex flex-col">
                            <h1 className="text-3xl lg:text-4xl font-extrabold mb-6 text-gray-800">{data.product.name}</h1>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex text-yellow-500">
                                        {[...Array(5)].map((_, index) => (
                                            <Star
                                                key={index}
                                                className={`text-3xl cursor-pointer transition-colors ${
                                                    index < Math.round(calculateReviewAverage()) ? 'text-yellow-500' : 'text-gray-300'
                                                }`}
                                                aria-label={`Rate ${index + 1} stars`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-sm lg:text-base text-gray-600">{data.review.length} { (data.review.length === 1 || data.review.length === 0)? 'Review' : 'Reviews'}</p>
                                </div>
                            </div>
                            {
                                (data.faq && data.faq.length > 0) ? (
                                    <div className="">
                                        <h2 className="text-2xl font-bold mb-4">FAQ</h2>
                                        <ul>
                                            {data.faq.map((item, index) => (
                                            <li key={index} className="border-b border-gray-200 mb-4">
                                                <div
                                                className="flex justify-between items-center py-3 cursor-pointer"
                                                onClick={() => toggleAnswer(index)}
                                                >
                                                <h3 className="text-lg font-medium">{item.question}</h3>
                                                <span className={`text-xl ${openIndex === index ? 'text-blue-600' : 'text-gray-500'} transition-transform`}>
                                                    {openIndex === index ? '-' : '+'}
                                                </span>
                                                </div>
                                                {openIndex === index && (
                                                <div className="py-2">
                                                    <p className="text-gray-700">{item.answer}</p>
                                                </div>
                                                )}
                                            </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : null
                                }
                                <Suspense fallback={<div>Loading...</div>}>
                                    <div className='grid md:grid-cols-2 grid-cols-1'>
                                        {data.product.colors.length > 0 && (
                                            <ColorDisplay colors={data.product.colors}/>
                                        )}
                                        {data.product.sizes.length > 0 && (

                                            <SizeDisplay sizes={data.product.sizes}/>
                                        )}
                                        <Quantity />
                                    </div>
                                    <Buttons product={data.product}/>
                                </Suspense>
                        </div>
                    </div>
                </div>
                <ProductSchema product={data.product} />
                <div className="mt-3 container max-w-5xl mx-auto">
                    <h2 className="text-2xl lg:text-3xl font-semibold mb-8 text-gray-800">Product Details</h2>
                    <ProductContent description={data.product.description}/>
                </div>
            </div>
        </>
        
    )
}