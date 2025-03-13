import { Noto_Sans } from "next/font/google";


const notoSans = Noto_Sans({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-noto-sans",
});

export default function ActiveViews() {
        const currentVisitors = 302
    return (
        <div className="flex gap-3 items-center">
            <div className="breathing-dot"></div>
            <p className={`${notoSans.className} antialiased`}>{currentVisitors} Customers viewing the drop</p>
        </div>
    )
}