import { Server } from "socket.io";

let io;
let activeUsers = 0;

export async function GET(req) {
    if (!io) {
        io = new Server(3001, {
            path: "/api/socket",
            cors: {
                origin: process.env.NEXT_PUBLIC_SOCKET_URL || "*",
                methods: ["GET", "POST"]
            }
        });

        io.on("connection", (socket) => {
            activeUsers++;
            io.emit("userCount", activeUsers);

            socket.on("disconnect", () => {
                activeUsers = Math.max(activeUsers - 1, 0);
                io.emit("userCount", activeUsers);
            });
        });

        console.log("WebSocket server started on port 3001");
    }

    return new Response("Socket server running", { status: 200 });
}
