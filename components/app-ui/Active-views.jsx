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
    const [userCount, setUserCount] = useState(0);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const socket = io("https://realtime-get-active-users.onrender.com");

        socket.on("userCount", (count) => {
            setUserCount(count);
        });

        socket.on("currentUser", (user) => {
            setCurrentUser(user);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className="flex gap-3 items-center">
            <div className="breathing-dot"></div>
            <p className={`${notoSans.className} antialiased`}>
                {userCount} {userCount === 1 ? "person is" : "people are"} currently shopping
            </p>

        </div>
    );
}
