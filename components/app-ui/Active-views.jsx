"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-noto-sans",
});

export default function ActiveViews() {
    const [currentVisitors, setCurrentVisitors] = useState(0);

    useEffect(() => {
        const socket = io("http://localhost:3001", {
            path: "/api/socket",
        });

        socket.on("userCount", (count) => {
            setCurrentVisitors(count);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className="flex gap-3 items-center">
            <div className="breathing-dot"></div>
            <p className={`${notoSans.className} antialiased`}>
                {currentVisitors} {currentVisitors === 1 ? "person is" : "people are"} currently shopping
            </p>

        </div>
    );
}
