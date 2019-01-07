import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const newReq = req.clone({ url: environment.apiUrl + req.url });
    console.log('LOOOOOKKKK HEEEERREEE PLEEEEAASEE');
    console.log(newReq.urlWithParams);
    return next.handle(newReq);
  }
}
