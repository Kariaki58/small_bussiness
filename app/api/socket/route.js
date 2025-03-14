import { Server } from "socket.io";

let activeUsers = 0;

export function GET(req) {
    if (!global.io) {
        const io = new Server(3001, {
            path: "/api/socket",
            cors: {
                origin: "*",
            },
        });

        io.on("connection", (socket) => {
            activeUsers++;
            io.emit("userCount", activeUsers);

            socket.on("disconnect", () => {
                activeUsers = Math.max(activeUsers - 1, 0);
                io.emit("userCount", activeUsers);
            });
        });

        global.io = io;
    }

    return new Response("Socket server running", { status: 200 });
}
