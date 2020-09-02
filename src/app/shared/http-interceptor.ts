import { Injectable, Injector } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Injectable()
export class BackendHttpInterceptor implements HttpInterceptor {
    private token: string;
    constructor(private router: Router, private auth: AuthService) {
        this.auth.auth0Client$.subscribe((cl) => {
            cl.getTokenSilently().then((tkn) => {
                this.token = tkn;
            });
        });
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let requestToForward = req;

        if (this.auth.loggedIn) {
            requestToForward = req.clone({
                setHeaders: { Authorization: `Bearer ${this.token}` }
            });
        }
        return next.handle(requestToForward).pipe(
            retry(2),
            catchError((error: HttpErrorResponse) => {
                let errorMessage = '';
                if (error.error instanceof ErrorEvent) {
                    // client-side error
                    errorMessage = `Error: ${error.error.message}`;
                } else {
                    // server-side error
                    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                    if (error.status === 0) {
                        // Server down
                        this.router.navigate(['/server-down']);
                    }
                }
                return throwError(error);
            })
        );
    }
}
