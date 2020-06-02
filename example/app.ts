import { App, Router } from '../mod.ts';

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
router.get('/view', async (ctx) => {
  console.log('cwd', Deno.cwd())
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
await app.listen();
