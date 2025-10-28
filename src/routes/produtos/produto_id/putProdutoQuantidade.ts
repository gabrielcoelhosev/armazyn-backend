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

      let alerta = '';
      let zerandoem = '';

    if(quantidade > 250){
        alerta = 'Estoque estável'
        zerandoem = '2026-01-20T00:00:00Z';
    } else{
        alerta = 'Ruptura iminente'
        zerandoem = '2025-11-15T00:00:00Z';
    }

    const semana1 = quantidade - 20;
    const semana2 = quantidade - 50;
    const semana3 = quantidade - 60;
    const semana4 = quantidade - 80; 


    const query: QueryConfig = {
        text: /*sql*/`
            UPDATE produtos
            SET estoqueatual = $1, alerta =$2, semana1 = $3, semana2 = $4, semana3 = $5, semana4 = $6, estoquezerandoem = $7
            WHERE id = $8
        `,
        values: [quantidade, alerta, semana1, semana2, semana3, semana4, zerandoem, id]
    }

    const updateQuantidade = await postgresHelper.sql(query);

    if (updateQuantidade.erro) {
        throw new Error('Erro ao atualizar quantidade produto');
    }

    return reply.status(201).send({
        data: `Produto de id ${id} atualizado com sucésso!`
    });
}