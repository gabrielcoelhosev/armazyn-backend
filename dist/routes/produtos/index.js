import { getProdutos } from "./getProdutos.js";
import { postProduto } from "./postProdutos.js";
import { produtoIdRoutes } from "./produto_id/index.js";
async function routes(fastify) {
    fastify.get('/', getProdutos);
    fastify.post('/', postProduto);
    fastify.register(produtoIdRoutes, { prefix: '/:id' });
}
export { routes as produtosRoutes };
//# sourceMappingURL=index.js.map