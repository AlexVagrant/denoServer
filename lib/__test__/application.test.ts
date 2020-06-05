import {
  Server,
  serve as denoServe,
  ServerRequest,
  HTTPOptions,
} from 'https://deno.land/std/http/server.ts';
import { assert, assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Application, } from '../application.ts';
import { Context } from '../context.ts';
interface ServerResponse {
    status?: number;
    headers?: Headers;
    body?: Uint8Array;
}


let serverRequestStack: ServerRequest[] = [];
let requestResponseStack: ServerResponse[] = [];

class MockServer {
  close(): void {}

  async *[Symbol.asyncIterator]() {
    for await (const request of serverRequestStack) {
      yield request;
    }
  }
}

function createMockRequest(
  url = "https://example.com/",
  proto = "HTTP/1.1",
): ServerRequest {
  return {
    url,
    headers: new Headers(),
    async respond(response: ServerResponse) {
      requestResponseStack.push(response);
    },
    proto,
  } as any;
}

function reset() {
  serverRequestStack = [];
  requestResponseStack =  [];
}
const serve: typeof denoServe = function (
    addr: string | HTTPOptions,
): Server {
    console.log(addr)
    return new MockServer() as Server;
};

Deno.test({
  name: 'Application test',
  fn: () :void => {
    const app = new Application();
    assert(app instanceof Application)
  }
})

Deno.test({
  name: 'Middlewares test',
  async fn() {
    serverRequestStack.push(createMockRequest());
    const app = new Application({serve});
    let count = 0
    app.use(async (ctx, next) => {
      assert(ctx instanceof Context)
      assertEquals(typeof next, 'function')
      count++;
      await next();
    })
    await app.listen({port: 2999})
    assertEquals(count, 1)
    reset();
  }
})

Deno.test({
  name: 'Middlewares test',
  async fn() {
    serverRequestStack.push(createMockRequest());
    let callback: number[] = []
    const app = new Application({serve});
    app.use(async (ctx, next) => {
      callback.push(1)
      await next();
      callback.push(2)
    })
    app.use(async (ctx, next) => {
      callback.push(3)
      await next();
      callback.push(4)
    })
    await app.listen({port: 2999});
    assertEquals(callback, [1,3,4,2]);
    reset();
  }
})


