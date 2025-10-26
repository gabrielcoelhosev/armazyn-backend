import type { FastifyReply, FastifyRequest } from "fastify";
import type { QueryConfig } from "pg";
import postgresHelper from "../../../helpers/postgresHelper.js";
import z from 'zod';

const querySchema = z.object({
    id: z.coerce.number(),
});

const bodySchema = z.object({
    quantidade: z.coerce.number()
});

export async function putProdutoQuantidade(req: FastifyRequest, reply: FastifyReply) {
    const { id } = querySchema.parse(req.params);
    const { quantidade } = bodySchema.parse(req.body);

    const query: QueryConfig = {
        text: /*sql*/`
            UPDATE produtos
            SET estoqueatual = $1
            WHERE id = $2
        `,
        values: [quantidade, id]
    }

    const updateQuantidade = await postgresHelper.sql(query);

    if (updateQuantidade.erro) {
        throw new Error('Erro ao atualizar quantidade produto');
    }

    return reply.status(201).send({
        data: `Produto de id ${id} atualizado com sucésso!`
    });
}