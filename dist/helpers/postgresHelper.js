import { Pool } from 'pg';
import { env } from '../env/index.js';
const pool = new Pool({
    connectionString: env.DATABASE_URL,
    max: 6,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
async function sql(query) {
    try {
        const result = await pool.query(query);
        return { erro: false, resultado: result.rows };
    }
    catch (err) {
        console.error('Erro ao executar query:', err);
        return { erro: true, resultado: null };
    }
}
export default {
    sql,
};
//# sourceMappingURL=postgresHelper.js.map