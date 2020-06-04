import {serve} from 'https://deno.land/std/http/server.ts';

const body = "Hello World\n";
const server = serve({ port: 8000 });
for await (const req of server) {
    console.log('test')
    req.respond({ body });
}

console.log('test')


