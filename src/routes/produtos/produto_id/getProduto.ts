import type { FastifyReply, FastifyRequest } from "fastify";
import type { QueryConfig } from "pg";
import z from 'zod';
import postgresHelper from "../../../helpers/postgresHelper.js";

const querySchema = z.object({
    id: z.coerce.number()
});

export async function getProduto(req: FastifyRequest, reply: FastifyReply){
    const { id } = querySchema.parse(req.params); 

    const query: QueryConfig = {
        text: /*sql*/`
            SELECT * 
            FROM produtos
            WHERE id = $1
        `,
        values: [id]
    }

    const produto = await postgresHelper.sql(query);

    if(produto.erro){
        throw new Error('Erro ao buscar produto');
    }

    return reply.status(200).send({
        data: produto.resultado
    });
}