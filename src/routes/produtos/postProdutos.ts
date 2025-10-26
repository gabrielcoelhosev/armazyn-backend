import type { FastifyReply, FastifyRequest } from "fastify";
import type { QueryConfig } from "pg";
import z from "zod";
import bwipjs from 'bwip-js';
import postgresHelper from "../../helpers/postgresHelper.js";

const bodySchema = z.object({
    id: z.number().positive(),
    nome: z.string(),
    unidade: z.string(),
    estoqueatual: z.number(),
    semana1: z.number(),
    semana2: z.number(),
    semana3: z.number(),
    semana4: z.number(),
    estoquezerandoem: z.string(),
    alerta: z.string()
});

export async function postProduto(req: FastifyRequest, reply: FastifyReply) {

    const {
        id,
        nome,
        unidade,
        estoqueatual,
        semana1,
        semana2,
        semana3,
        semana4,
        estoquezerandoem,
        alerta
    } = bodySchema.parse(req.body);

    const codigobarras = await bwipjs.toBuffer({
        bcid: 'code128',
        text: String(id),
        scale: 3,
        height: 10,
        includetext: false
    });

    const codigoBarrasBase64 = codigobarras.toString('base64');

    const query: QueryConfig = {
        text: /*sql*/`
            INSERT INTO produtos (id, nome, unidade, estoqueatual, semana1, semana2, semana3, semana4, estoquezerandoem, alerta, codigobarras)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `,
        values: [
            id,
            nome,
            unidade,
            estoqueatual,
            semana1,
            semana2,
            semana3,
            semana4,
            estoquezerandoem,
            alerta,
            codigoBarrasBase64
        ]
    }

    const insertProdutos = await postgresHelper.sql(query)

    if (insertProdutos.erro) {
        throw new Error('Erro ao cadastrar produtos!');
    }

    return reply.status(201).send({
        data: 'Produtos Cadastrados com sucésso!'
    });

}