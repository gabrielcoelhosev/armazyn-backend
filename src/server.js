// server.ts
import { app } from "./app.js";
import { env } from "./env/index.js";
import { Server } from "socket.io";
export let io; // exportamos a instância
const start = async () => {
    try {
        await app.listen({ port: env.PORT });
        console.log(`API is running on port ${env.PORT}`);
        io = new Server(app.server, {
            cors: {
                origin: "*",
                allowedHeaders: ['*'],
                methods: ['*']
            },
        });
        io.on('connection', (socket) => {
            console.log('a user connected');
        });
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=server.js.map