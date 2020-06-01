import { Application } from './application.ts'; 
import { ServerRequest, HTTPMethod} from './type.d.ts';
import { Request } from './request.ts';
import { AppResponse } from './response.ts';
import { Cookie } from './cookie.ts';

export class Context {
   request: Request;
   response: AppResponse;
   cookie: Cookie;
   constructor(application: Application, serverRequest: ServerRequest) {
      this.request = new Request(serverRequest);
      this.response = new AppResponse(serverRequest);
      this.cookie = new Cookie(serverRequest,this.response);
   }
   get url(): string {
      return this.request.url;
   }
   
   get method(): HTTPMethod {
      return this.request.method;
   }
   
}
