import type { FastifyInstance } from "fastify";
import { postContagem } from "./postContagem.js";

async function routes(fastify: FastifyInstance){
    fastify.post('/', postContagem);
}

export {routes as contagemRoutes}
