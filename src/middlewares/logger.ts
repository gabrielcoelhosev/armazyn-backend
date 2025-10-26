import type { FastifyReply, FastifyRequest } from "fastify";

export async function logger(req: FastifyRequest, reply: FastifyReply) {
    const { ip, method, url } = req;
    const { statusCode } = reply;
    console.log(`Request => [${ip} - ${method} - ${formatStatusCode(statusCode)} - ${url}]`);
}

function formatStatusCode(status: number) {
    const color =
        status >= 500 ? 31 // red
            : status >= 400 ? 33 // yellow
                : status >= 300 ? 36 // cyan
                    : status >= 200 ? 32 // green
                        : 0;

    return `\x1b[${color}m${status}\x1b[0m`;
}