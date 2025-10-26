import type { QueryConfig } from 'pg';
interface SqlResult {
    erro: boolean;
    resultado: any;
}
declare function sql(query: QueryConfig): Promise<SqlResult>;
declare const _default: {
    sql: typeof sql;
};
export default _default;
//# sourceMappingURL=postgresHelper.d.ts.map