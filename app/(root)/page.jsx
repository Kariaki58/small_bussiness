import Header from "@/components/app-ui/header";
import ProductList from "@/components/app-ui/ProductList";
import ProductDisplayCategory from "@/components/app-ui/Category";

export default async function Home({ searchParams }) {
  const params = await searchParams;
  return (
    <main>
      <Header />
      <ProductDisplayCategory searchParams={params}/>
      <ProductList searchParams={params} />
    </main>
  )
}
