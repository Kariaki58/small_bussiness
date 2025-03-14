import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-josefin",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} antialiased`}
      >
        <Analytics/>
        {children}
      </body>
    </html>
  );
}
