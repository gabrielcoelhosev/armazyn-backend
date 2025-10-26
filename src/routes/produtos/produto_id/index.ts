import type { FastifyInstance } from "fastify";
import { getProduto } from "./getProduto.js";
import { putProdutoQuantidade } from "./putProdutoQuantidade.js";

async function routes(fastify: FastifyInstance){
    fastify.get('/', getProduto);
    fastify.put('/', putProdutoQuantidade);
}

export {routes as produtoIdRoutes}