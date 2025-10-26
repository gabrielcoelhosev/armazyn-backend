import type { FastifyReply, FastifyRequest } from "fastify";
import type { QueryConfig } from "pg";
import postgresHelper from "../../helpers/postgresHelper.js";

export async function getProdutos(req: FastifyRequest, reply: FastifyReply){

    const query: QueryConfig = {
        text: `
            SELECT * FROM produtos
        `,
        values: []
    }

    const queryProdutos = await postgresHelper.sql(query)

    const produtos = queryProdutos.resultado

    return reply.status(200).send({
        data: produtos
    });
}