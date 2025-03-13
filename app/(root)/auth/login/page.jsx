"use client";

import { signIn } from "next-auth/react"


export default function Login() {
    return (
        <button onClick={() => signIn("google")} className="bg-fuchsia-500 p-4 hover:bg-fuchsia-600 rounded-lg cursor-pointer text-white">Sign in with Google</button>
    )
}