"use client";

import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from "next/image";

export default function ImageDisplay({ images }) {
    if (images.length === 0) return <p>No images found.</p>;
    return (
        <div className="relative">
            <Carousel
                showThumbs={true}
                autoPlay
                infiniteLoop
                interval={3000}
                showArrows={true}
                showStatus={false}
                className="rounded-lg overflow-hidden"
            >
                {images.map((image, index) => (
                    <div key={index} className="relative w-full h-[600px]">
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
        </div>
    )
}