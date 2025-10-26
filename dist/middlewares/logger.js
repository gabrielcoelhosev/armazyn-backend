export async function logger(req, reply) {
    const { ip, method, url } = req;
    const { statusCode } = reply;
    console.log(`Request => [${ip} - ${method} - ${formatStatusCode(statusCode)} - ${url}]`);
}
function formatStatusCode(status) {
    const color = status >= 500 ? 31 // red
        : status >= 400 ? 33 // yellow
            : status >= 300 ? 36 // cyan
                : status >= 200 ? 32 // green
                    : 0;
    return `\x1b[${color}m${status}\x1b[0m`;
}
//# sourceMappingURL=logger.js.map