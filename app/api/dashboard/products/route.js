import { connectToDatabase } from "@/lib/mongoose";
import { getServerSession } from "next-auth/next"
import { options } from "../../auth/options";
import Product from "@/models/product";


export async function GET(req, res) {
    const session = await getServerSession({req, ...options})

    return new Response(JSON.stringify({ message: "thank you"}), { status: 200})
}

export async function POST(req, res) {
    await connectToDatabase();
    const { name } = req.body;


    const { session } = await getServerSession({req, ...options})
    if (!session) {
        return new Response(JSON.stringify({ error: "You are not currently logged in"}), { status: 401 });
    }
    if (session?.user?.role !== "admin") {
        return new Response(JSON.stringify({ error: "You are not authorized to access this resource"}), { status: 403 });
    }
    

    try {

    } catch (e) {

    }
    return new Response(JSON.stringify({ message: "thank you"}), { status: 200})
}
