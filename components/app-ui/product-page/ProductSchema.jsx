import Head from 'next/head';

const ProductSchema = ({ product }) => {
    const structuredData = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.name,
        "image": product.images[0],
        "description": product.description,
        "offers": {
        "@type": "Offer",
        "price": product.price,
        "availability": "https://schema.org/InStock"
        }
    };

    return (
        <Head>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        </Head>
    );
};

export default ProductSchema;
