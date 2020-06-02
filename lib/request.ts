import {ServerRequest, HTTPMethod} from './type.d.ts';
export interface Response {
  status?: number;
  headers?: Headers;
  body?: Uint8Array | Deno.Reader;
}
export class Request {
    serverRequest: ServerRequest;
    constructor(serverRequest: ServerRequest) {
        this.serverRequest = serverRequest;
    }
    get method(): HTTPMethod{
       return this.serverRequest.method as HTTPMethod;
    }
    get url(): string {
        return this.serverRequest.url;
    }

    get headers(): Headers {
        return this.serverRequest.headers;
    }

    get body(): Deno.Reader {
        return this.serverRequest.body;
    }
}
