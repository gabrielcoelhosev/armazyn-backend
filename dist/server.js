import { app } from "./app.js"; // aqui só importamos, sem definir nada novo
import { env } from "./env/index.js";
import { Server } from "socket.io";
export let io; // exportamos a instância
const port = Number(env.PORT || 3000);
const start = async () => {
    try {
        // Inicia o Fastify
        await app.listen({ port, host: '0.0.0.0' });
        console.log(`API is running on port ${port}`);
        // Inicializa o Socket.IO
        io = new Server(app.server, {
            cors: {
                origin: "*",
                allowedHeaders: ['*'],
                methods: ['*'],
            },
        });
        io.on('connection', (socket) => {
            console.log('a user connected');
        });
    }
    catch (err) {
        console.error('Error starting server:', err);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=server.js.map