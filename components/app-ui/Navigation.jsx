"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { cartIcon, searchIcon, logo, menu } from "@/public";
import closeIcon from "@/public/icons/close.svg";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import useCartStore from "@/store/cartStore";
import CartDisplay from "./cart-display";

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const { cart } = useCartStore();
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const query = searchParams.get("search") || "";
        setSearchQuery(query);
    }, [searchParams]);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
    
        const params = new URLSearchParams(searchParams.toString());
    
        if (query.trim() === "") {
            params.delete("search");
        } else {
            params.set("search", query);
        }
    
        router.replace(`/?${params.toString()}`, { scroll: false });
    };
    

    return (
        <div className="md:mx-2">
        <nav className="bg-white shadow-md px-5 py-3 rounded-none md:rounded-full mt-0 md:mt-5 max-w-screen-xl mx-auto flex justify-between items-center relative">
            <div className="flex items-center gap-2">
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    <Image src={menu} alt="menu" width={30} height={30} />
                </button>
                <Link href="/">
                    <Image alt="company logo" src="https://res.cloudinary.com/dviwggb7g/image/upload/v1732468904/images/IMG-20241124-WA0001_gvv6dy.jpg" width={60} height={60} />
                </Link>
            </div>

            <ul className="hidden md:flex gap-10">
                <li><Link href="/" className="uppercase">Home</Link></li>
                <li><Link href="/order-track" className="uppercase">Tracking</Link></li>
                <li><Link href="/contact" className="uppercase">Contact Us</Link></li>
            </ul>

            <div className="flex gap-5 items-center">
                <div className="relative">
                    <Image
                        alt="search icon"
                        src={showSearch ? closeIcon : searchIcon}
                        width={25}
                        height={25}
                        className="cursor-pointer"
                        onClick={() => setShowSearch(!showSearch)}
                    />
                </div>
                
                <div className="relative" 
                    onClick={() => setOpenCart(true)}

                >
                    <Image
                        alt="cart icon"
                        src={cartIcon}
                        width={35}
                        height={35}
                        className="cursor-pointer"
                    />
                    <span className="text-sm absolute -top-2 -right-2 bg-fuchsia-500 text-white px-2 py-1 rounded-full">
                        {cart.length}
                    </span>
                </div>
            </div>

            {isOpen && (
                <motion.div 
                    initial={{ x: -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="absolute top-16 left-0 w-full bg-gray-200 p-5 flex flex-col gap-5 shadow-md md:hidden z-50"
                >
                    <button className="absolute top-2 right-5" onClick={() => setIsOpen(false)}>
                        <X size={30} />
                    </button>
                    <Link href="/" className="uppercase" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link href="/order-track" className="uppercase" onClick={() => setIsOpen(false)}>Tracking</Link>
                    <Link href="/contact" className="uppercase" onClick={() => setIsOpen(false)}>Contact Us</Link>
                </motion.div>
            )}

            {openCart && <CartDisplay setOpenCart={setOpenCart} />}
        </nav>
        {showSearch && (
                <div className="w-full mt-2 rounded-md flex justify-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="px-4 py-2 w-3/4 border rounded-full"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            )}
        </div>
    );
}