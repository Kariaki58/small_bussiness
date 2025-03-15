"use client";

import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from "next/image";

export default function ImageDisplay({ images }) {
    if (images.length === 0) return <p>No images found.</p>;

    const [selectedIndex, setSelectedIndex] = useState(0); // Track active image

    return (
        <div className="relative">
            {/* Image Carousel */}
            <Carousel
                selectedItem={selectedIndex}
                onChange={(index) => setSelectedIndex(index)}
                showThumbs={false}
                autoPlay
                infiniteLoop
                interval={3000}
                showArrows={true}
                showStatus={false}
                className="rounded-lg overflow-hidden"
            >
                {images.map((image, index) => (
                    <div key={index} className="relative w-full h-[400px] sm:h-[500px] md:h-[600px]">
                        <Image
                            src={image}
                            layout="fill"
                            objectFit="cover"
                            priority
                            alt={`Product image ${index + 1}`}
                        />
                    </div>
                ))}
            </Carousel>

            {/* Thumbnails Below */}
            <div className="mt-4 flex justify-center gap-2">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`relative w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] border rounded-lg overflow-hidden cursor-pointer 
                        ${selectedIndex === index ? "border-2 border-black" : "border-gray-300"}`}
                        onClick={() => setSelectedIndex(index)}
                    >
                        <Image
                            src={image}
                            layout="fill"
                            objectFit="cover"
                            alt={`Thumbnail ${index + 1}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
