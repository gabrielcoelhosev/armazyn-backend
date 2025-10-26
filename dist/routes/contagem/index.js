import { postContagem } from "./postContagem.js";
async function routes(fastify) {
    fastify.post('/', postContagem);
}
export { routes as contagemRoutes };
//# sourceMappingURL=index.js.map