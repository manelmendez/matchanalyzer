import api from "./routes/routes.ts";

import {
  Application,
  Context,
  send,
  oakCors,
  path
} from "./deps.ts";

const app = new Application();
// Logger
const logging = async (ctx: Context, next: Function) => {
  console.log(`HTTP ${ctx.request.method} on ${ctx.request.url}`);
  await next();
};
app.use(logging);
// Serve static files
const basePath = Deno.cwd()
// app.use(async(ctx: Context) => {
//   console.log('returning a response ...');
//   // ctx.response.body = 'Hello Deno';
//   console.log(ctx.request.url.pathname);
//   console.log(path.join(basePath,"../client/dist"));
  
//   await send(ctx, ctx.request.url.pathname, {
//     root: path.join(basePath,"../client/dist"),
//     index: "index.html",
//   });
// });
// middleware para usar CORS y su configuración (métodos que permite)
app.use(oakCors());

app.use(api.routes());
app.use(api.allowedMethods());

export default app
