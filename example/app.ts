import { App, Router, Context } from '../mod.ts';
import {
  acceptWebSocket,
  acceptable,
  isWebSocketCloseEvent,
  WebSocket,
} from "https://deno.land/std/ws/mod.ts";
const  app = new App();
const router = new Router();
const route = router.routes();
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
  const watcher = Deno.watchFs('./index.html');
  let timer: undefined | number; 
  for await (let msg of ws) {
    for await (const event of watcher) {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(async () => {
          console.log('reload')
          await ws.send('reload')
        }, 100)
    }
    if (isWebSocketCloseEvent(msg)) {
      // Take out user from usersMap
      break;
    }
  }
}

router.get('/ws', async (ctx: Context) => {
  const { conn, r: bufReader, w: bufWriter, headers} = ctx.request.serverRequest;
  if (acceptable(ctx.request.serverRequest)) {
    const sock = await acceptWebSocket({
      conn,
      bufReader,
      bufWriter,
      headers,
    })
    await chat(sock)
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
