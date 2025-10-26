import postgresHelper from "../../helpers/postgresHelper.js";
export async function getProdutos(req, reply) {
    const query = {
        text: `
            SELECT * FROM produtos
        `,
        values: []
    };
    const queryProdutos = await postgresHelper.sql(query);
    const produtos = queryProdutos.resultado;
    return reply.status(200).send({
        data: produtos
    });
}
//# sourceMappingURL=getProdutos.js.map