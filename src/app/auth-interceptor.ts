import {
  Injectable,
  Injector
} from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import {DatePipe} from '@angular/common';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {Snack} from './classes/snackbar';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isShown: boolean;

  constructor(private inj: Injector,
              private translate: TranslateService,
              public snackBar: Snack) {
  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = this.inj.get(AuthService);
    const authHeader = auth.getAuthorizationHeader();
    const authReq = req
      .clone({setHeaders: {Authorization: authHeader}});
    const body = req.body;
    let newBody;

    const array_excluded = [
      'plantilla',
      'documento',
      'pacientefoto'
    ];
    const found = req.url.split('/')
      .some(valor =>
        array_excluded.indexOf(valor) >= 0);

    // Comporvem si la url és alguna de les excloses.
    if (!found) {
      if (body) {
        newBody = {};
      }

      for (const key in body) {

        newBody[key] = body[key];

      }
    }

    // clone request and set its body
    const newReq = authReq.clone({body: newBody});
    // send the cloned request to the next handler.

    return next.handle(newReq)
      .pipe(
        tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              // Si volem fer algo amb la resposta es fa aqui
            }
          }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                // En cas de que ens retorni un error de autenticacio
                // retornem a l'usuari la pantalla de login.
                auth.logout();
              }
              if (err.status === 0) {
                if (!this.isShown) {
                  this.isShown = true;
                  const mensaje = this.translate.instant('database_error_api');
                  this.snackBar.openSnackBar(mensaje, 'OK');
                  setTimeout(this.isShown = false, 3000);
                }
              }
            }
          }
        ));
  }
}
