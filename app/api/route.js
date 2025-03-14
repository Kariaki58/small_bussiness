const createSlug = (name) =>
    name
      .replace(/\s+/g, '-'); // Replace spaces with hyphens

export async function GET() {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/all`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        });

        if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const products = await response.json();

        if (!products || !Array.isArray(products)) {
        throw new Error("Invalid API response: Missing 'products' array");
        }

        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        products.forEach((product) => {
        const slug = createSlug(product.name);
        sitemap += `<url><loc>https://poshwears.ng/products/${slug}</loc></url>\n`;
        });

        sitemap += `</urlset>`;

        return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
        },
        });

    } catch (error) {
        console.error("Sitemap generation error:", error);
        return new Response(`<error>${error.message}</error>`, {
        status: 500,
        headers: { 'Content-Type': 'application/xml' },
        });
    }
}
