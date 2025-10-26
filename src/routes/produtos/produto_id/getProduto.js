import z from 'zod';
import postgresHelper from "../../../helpers/postgresHelper.js";
const querySchema = z.object({
    id: z.coerce.number()
});
export async function getProduto(req, reply) {
    const { id } = querySchema.parse(req.params);
    const query = {
        text: /*sql*/ `
            SELECT * 
            FROM produtos
            WHERE id = $1
        `,
        values: [id]
    };
    const produto = await postgresHelper.sql(query);
    if (produto.erro) {
        throw new Error('Erro ao buscar produto');
    }
    return reply.status(200).send({
        data: produto.resultado
    });
}
//# sourceMappingURL=getProduto.js.map