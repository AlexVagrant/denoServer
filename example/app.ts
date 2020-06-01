import { App, Router } from '../mod.ts';

const router = new Router();
const  app = new App();

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
router.get('/view', async (ctx) => {
  const data = await Deno.readFile('./index.html');
  ctx.response.headers.set('Content-Type', 'text/html;charset=utf-8');
  ctx.response.body = data;
})
router.get('/api/upload', async (ctx) => {
    ctx.response.headers.set('Content-Type', 'application/json; charset=utf-8');
    ctx.response.body = {
        message: "test",
        data: {
            name: "mike",
            age: "13",
        },
    };
})
let middleware = router.routes();
app.use(middleware);
await app.listen();
