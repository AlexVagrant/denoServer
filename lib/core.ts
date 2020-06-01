import {pathToRegexp} from 'https://deno.land/x/path_to_regexp/mod.ts';
import {container} from './container.ts'

import {Context} from './context.ts';
import {Next} from './application.ts';
import { Middlewares, } from './type.d.ts'
type Stack =  {
	path: string;
	method: string;
	middleware: Middlewares;
}
export class Router {
	#stack: Stack[];
	constructor() {
		this.#stack = [];
	}
    routes(): Middlewares {
	  return async (ctx: Context, next: Next) => {
		let url = ctx.url === '/index' ? '/' : ctx.url;  
		let method = ctx.method.toLocaleLowerCase();
		let route: Middlewares = () => {};
		for (let i = 0; i < this.#stack.length; i++) {
			let item = this.#stack[i];
			
			if (url.includes('?')) {
				url = url.split('?')[0];
			}
			console.log(item.path, url)
			if (item.path === url && item.method === method) {
				route = item.middleware;
				break;
			}
		}
		if (typeof route === 'function') {
			await route(ctx,next);
			return;
		}
		await next();
	  }
  }

  get(path: string, middleware: Middlewares) {
	  this.#stack.push({path, method:'get', middleware})
  }

  post(path: string, middleware: Middlewares) {
	  this.#stack.push({path, method:'post', middleware})
  }
}
export function provide(path: string) {
	return (target: any) => {
		container.regiseter(path, target)
	}
}

