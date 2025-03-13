import Navigation from "@/components/app-ui/Navigation"
import ActiveViews from "@/components/app-ui/Active-views"
import Footer from "@/components/app-ui/Footer"
import { Suspense } from "react"

export default async function RootLayout({ children }) {
    
    return (
        <main>
            <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
                <Navigation />
            </Suspense>
            <div className="flex justify-center my-5">
                <ActiveViews />
            </div>
            <main className="max-w-screen-xl mx-auto">
                {children}
            </main>
            <Footer />
        </main>
    )
}