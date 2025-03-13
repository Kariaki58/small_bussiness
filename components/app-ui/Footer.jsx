"use client";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useActionState } from "react";
import { handleData } from "@/actions/newsletter";
import Link from "next/link";

const initialState = {
    message: "",
}
export default function Footer() {
        const [state, formAction, pending] = useActionState(handleData, initialState);
    return (
        <footer className="bg-gray-900 text-white py-10 px-6 md:px-12">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold">Posh Wears</h2>
                    <p className="text-white text-sm mt-1 md:w-1/2">
                        Welcome to Posh Wears! We offer trendy, high-quality, and affordable fashion for every occasion. Enjoy fast shipping, hassle-free returns, and exceptional customer service. Express yourself with confidence—your style, our passion!
                    </p>
                </div>
                <div className="w-full md:w-1/2">
                    <p className="text-white text-sm mb-2">Subscribe to our newsletter</p>
                    <form action={formAction} className="flex items-center border border-gray-600 rounded-lg overflow-hidden">
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full px-3 py-2 bg-gray-800 text-white outline-none"
                        />
                        <p aria-live="polite">{state?.message}</p>
                        <button disabled={pending} className="bg-blue-600 px-4 py-2 text-white font-semibold">{pending ? "Signing Up..." : "Sign Up" }</button>
                    </form>
                </div>
            </div>
            <div className="flex justify-center gap-4 mt-6">
                <Link href="#" className="text-white hover:text-white">
                    <Facebook size={24} />
                </Link>
                <Link href="#" className="text-white hover:text-white">
                    <Twitter size={24} />
                </Link>
                <Link href="#" className="text-white hover:text-white">
                    <Instagram size={24} />
                </Link>
                <Link href="#" className="text-white hover:text-white">
                    <Linkedin size={24} />
                </Link>
            </div>

            <div className="border-t border-gray-700 mt-8 pt-4 text-center text-white text-sm">
                <p>&copy; {new Date().getFullYear()} Storelicom. All rights reserved.</p>
            </div>
        </footer>
    );
}
