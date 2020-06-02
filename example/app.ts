import { App, Router, Context } from '../mod.ts';
import {
  acceptWebSocket,
  acceptable,
  isWebSocketPingEvent,
  isWebSocketCloseEvent,
  WebSocket,
} from "https://deno.land/std/ws/mod.ts";
const  app = new App();
const router = new Router();
const route = router.routes();
let sock: any;
// app.use(async (ctx) => {
//     ctx.response.headers.set('Content-Type', 'application/json');
//     ctx.cookie.setCookie({
//         name: 'deno',
//         value: 'runtime',
//         httpOnly: true,
//         maxAge: 2,
//         domain: "localhost"
//     })
//     ctx.response.body = {
//         message: 'test',
//         data: {
//             name: 'mike',
//             age: '13',
//         }
//     };
// })
//


async function chat(ws: WebSocket) {
  for await (let msg of sock) {
    console.log('sockmsg', msg)
    if (isWebSocketCloseEvent(msg)) {
      // Take out user from usersMap
      break;
    }
  }
}
router.get('/ws', async (ctx: Context) => {
  const { conn, r: bufReader, w: bufWriter, headers} = ctx.request.serverRequest;
  if (acceptable(ctx.request.serverRequest)) {
    acceptWebSocket({
      conn,
      bufReader,
      bufWriter,
      headers,
    }).then(chat)
  }
  
})
router.get('/', async (ctx: Context) => {
  const data = await Deno.readFile('./index.html');
  ctx.response.headers.set('Content-Type', 'text/html;charset=utf-8');
  ctx.response.body = data;
})

router.get('/api/upload', async (ctx) => {
    ctx.response.headers.set('Content-Type', 'application/json; charset=utf-8');
    ctx.response.body = {
        message: "test",
        data: {
            name: "mary",
            age: "13",
        },
    };
})

app.use(route);
await app.listen({ port: 4000, });
