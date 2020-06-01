import { ServerRequest, Response, } from './type.d.ts';
const BASIC_TYPES = ["string", "number", "boolean", "symbol"];
export class AppResponse {
    #serverRequest: ServerRequest;
    #body: any;
    headers: Headers;
    #response: Response;
    constructor(serverRequest: ServerRequest) {
        this.#serverRequest = serverRequest;
        this.headers = new Headers();
        this.#response = {
            body: this.#body,
            headers: this.headers,
            status: 200,
        }
    }

    set body(data: any){
        const encoder = new TextEncoder();
        const bodyType = typeof data;
        if (BASIC_TYPES.includes(bodyType)) {
            this.#body = encoder.encode(String(data));
        } else if (ArrayBuffer.isView(data)) {
            this.#body = data;
        } else if (bodyType === 'object' && data!=null) {
            this.#body = encoder.encode(JSON.stringify(data));
        } else {
            this.#body = data;
        }
        this.#response.body = this.#body
    }

    get body(): any {
        return this.#body;
    }

    set status(status: number) {
        this.#response.status = status;
    }

    appResponse(): Response {
        return this.#response;
    }
}
