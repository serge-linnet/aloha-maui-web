import { Injectable } from "@angular/core";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthInfo, AuthService, tokenGetter } from "./services/auth.service";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private jwtHelper: JwtHelperService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const isAuthRequest = request.url.includes("Auth/");
        if (!isAuthRequest) {
            const token = this.authService.getToken();
            if (token) {
                if (this.jwtHelper.isTokenExpired(token.accessToken)) {
                    this.authService.refreshToken(token.refreshToken).subscribe((response: AuthInfo) => {
                        this.authService.saveToken(response);
                        request = request.clone({
                            setHeaders: {
                                Authorization: `Bearer ${response.accessToken}`
                            }
                        });
                    });
                }
            }
        }

        return next.handle(request);
    }
}
