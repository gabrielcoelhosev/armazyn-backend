import { getProduto } from "./getProduto.js";
import { putProdutoQuantidade } from "./putProdutoQuantidade.js";
async function routes(fastify) {
    fastify.get('/', getProduto);
    fastify.put('/', putProdutoQuantidade);
}
export { routes as produtoIdRoutes };
//# sourceMappingURL=index.js.map