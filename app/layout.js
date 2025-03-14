import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import SocketInitializer from "@/components/SocketInitializer";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-josefin",
});

export const metadata = {
  title: "Shop the Best Boutique Fashion | poshwears",
  description: "Discover stylish boutique fashion, latest trends, and exclusive collections. Shop now and enjoy fast shipping worldwide.",
  keywords: "boutique fashion, trendy clothing, online shopping, women's fashion",
  openGraph: {
    title: "Shop the Best Boutique Fashion | poshwears",
    description: "Discover stylish boutique fashion, latest trends, and exclusive collections.",
    url: "https://poshwears.ng",
    site_name: "Poshwears",
    images: [
      {
        url: "https://res.cloudinary.com/dviwggb7g/image/upload/v1732468902/images/IMG-20241124-WA0002_qmkt7a.jpg",
        width: 1200,
        height: 630,
        alt: "Your Store Banner",
      },
    ],
    type: "website",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} antialiased`}
      >
        <SocketInitializer />
        <Analytics/>
        {children}
      </body>
    </html>
  );
}
