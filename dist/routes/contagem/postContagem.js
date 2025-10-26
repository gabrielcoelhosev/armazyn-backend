import z from 'zod';
import postgresHelper from "../../helpers/postgresHelper.js";
import { io } from "../../server.js"; // importamos o Socket.IO
const bodySchema = z.object({
    codigoBarras: z.string()
});
export async function postContagem(req, reply) {
    const { codigoBarras } = bodySchema.parse(req.body);
    const query = {
        text: /*sql*/ `
            SELECT
                id,
                nome,
                estoqueatual
            FROM produtos
            WHERE codigobarras = $1
        `,
        values: [codigoBarras]
    };
    const selectProduto = await postgresHelper.sql(query);
    if (selectProduto.erro) {
        throw new Error('Erro ao atualizar quantidade');
    }
    console.log('oridyuti => ', selectProduto.resultado);
    const { id, estoqueatual, nome } = selectProduto.resultado[0];
    // 🔔 Emite evento via WebSocket
    if (io) {
        io.emit('Produto identificado', { id, nome, estoqueatual });
    }
    return reply.status(200).send({
        data: 'Quantidade atualizada com sucesso'
    });
}
//# sourceMappingURL=postContagem.js.map