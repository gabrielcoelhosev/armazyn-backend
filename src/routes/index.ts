import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { produtosRoutes } from "./produtos/index.js";
import { contagemRoutes } from "./contagem/index.js";

export async function routes(fastify: FastifyInstance) {

    fastify.get('/check', async (_req: FastifyRequest, reply: FastifyReply) => {
        return reply.status(200).send({
            message: 'Api online!'
        });
    });

    fastify.register(produtosRoutes, { prefix: '/produtos' });
    fastify.register(contagemRoutes, { prefix: '/contagem' });
}