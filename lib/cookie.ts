import { ServerRequest } from "./type.d.ts";
import {AppResponse} from './response.ts';
import {getCookies, delCookie, Cookies, setCookie, Cookie as DenoCookie,} from 'https://deno.land/std/http/cookie.ts';

export class Cookie {
    #serverRequest: ServerRequest;
    #response: AppResponse;
    constructor(serverRequest: ServerRequest, response: AppResponse) {
        this.#serverRequest = serverRequest
        this.#response = response;
    }
    get cookies(): Cookies {
        return getCookies(this.#serverRequest);
    }
    
    setCookie(cookie: DenoCookie) {
        setCookie(this.#response, cookie);
    }
    delCookie(name: string): void {
        delCookie(this.#response, name)
    }
}