import Header from "@/components/app-ui/header";
import ProductList from "@/components/app-ui/ProductList";
import ProductDisplayCategory from "@/components/app-ui/Category";
import Head from "next/head";

export default async function Home({ searchParams }) {
  const params = await searchParams;
  return (
    <main>
      <Head>
        <meta property="og:title" content="Shop the Best Boutique Fashion | poshwears" />
        <meta property="og:description" content="Discover stylish boutique fashion, latest trends, and exclusive collections." />
        <meta property="og:image" content="https://res.cloudinary.com/dviwggb7g/image/upload/v1732468902/images/IMG-20241124-WA0002_qmkt7a.jpg" />
        <meta property="og:url" content="https://poshwears.ng" />
      </Head>
      <Header />
      <ProductDisplayCategory searchParams={params}/>
      <ProductList searchParams={params} />
    </main>
  )
}
