import fastify from "fastify";
import { routes } from "./routes/index.js";
import { logger } from "./middlewares/logger.js";
import fastifyCors from "@fastify/cors";

export const app = fastify();

// Configurações
await app.register(fastifyCors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

app.addHook('onResponse', logger);
app.register(routes);

// Rota raiz
app.route({
  method: ['GET', 'HEAD'],
  url: '/',
  handler: async () => ({ message: 'API is running' }),
});
