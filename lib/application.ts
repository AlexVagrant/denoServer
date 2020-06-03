import { listenAndServe, } from 'https://deno.land/std/http/server.ts';
import {ServerRequest, HTTPOptions, Middlewares} from './type.d.ts';
import {
  acceptable,
} from "https://deno.land/std/ws/mod.ts";
import {Context} from './context.ts';

export type Next = () => Promise<void>
export class Application {

	#middlewares: Middlewares[];
	constructor(){
		this.#middlewares = [];
	}

	compose(middlewares: Middlewares[]) {
		return function composeMiddlewares(ctx: Context, next?: Next) {
			function dispatch(i: number): Promise<void> {
				let fn: Middlewares | undefined = middlewares[i];
				if (i === middlewares.length) {
					fn = next;
				}
				if (!fn) {
					return Promise.resolve();
				}
				return Promise.resolve(fn(ctx, function () {
					return dispatch(i+1);
				}))
			}
			return dispatch(0);
		}
	}
	/**
	 * @param callback customer function
	 * 
	 **/
	use = (callback: Middlewares) =>  {
		this.#middlewares.push(callback);
	}	

	async listen(options: HTTPOptions={port: 3000}, callback?: () => void) {
    callback && callback();
		return listenAndServe(options, async (req: ServerRequest) => {
			const ctx = new Context(this, req);
			const compose = this.compose(this.#middlewares)	
			await compose(ctx)
			const respond = ctx.response.appResponse()
			// is not websocket
			if (!acceptable(req)) {
        await req.respond(respond);
      }
		})
	}
}
