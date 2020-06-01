import { Context } from './context.ts';

export {
    ServerRequest,
    HTTPOptions,
    Response,
} from 'https://deno.land/std/http/server.ts'

export type HTTPMethod = 
  | "HEAD"
  | "OPTIONS"
  | "GET"
  | "PUT"
  | "PATCH"
  | "POST"
  | "DELETE";

export interface Middlewares {
  (ctx: Context, next: () => Promise<void>): Promise<void> | void;
}