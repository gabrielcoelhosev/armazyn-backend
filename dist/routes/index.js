import { produtosRoutes } from "./produtos/index.js";
import { contagemRoutes } from "./contagem/index.js";
export async function routes(fastify) {
    fastify.get('/check', async (_req, reply) => {
        return reply.status(200).send({
            message: 'Api online!'
        });
    });
    fastify.register(produtosRoutes, { prefix: '/produtos' });
    fastify.register(contagemRoutes, { prefix: '/contagem' });
}
//# sourceMappingURL=index.js.map