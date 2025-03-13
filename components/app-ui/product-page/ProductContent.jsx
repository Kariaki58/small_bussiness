"use client";

import dynamic from "next/dynamic";

const ProductContent = ({ description }) => {
    if (!description) return null;
    return (
        <div className="text-base lg:text-lg text-gray-700 leading-relaxed">
            <p dangerouslySetInnerHTML={{ __html: description }} />
        </div>
    );
};

export default dynamic(() => Promise.resolve(ProductContent), { ssr: false });
