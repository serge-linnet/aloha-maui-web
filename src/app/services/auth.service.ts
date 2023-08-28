import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { User } from "../models/user.model";
import { environment } from "src/environments/environment";
import { JwtHelperService } from "@auth0/angular-jwt";

const STORAGE_KEY = "user";

export type AuthInfo = {
    accessToken: string;
    refreshToken: string;
};

export const tokenGetter = (_?: HttpRequest<any> | undefined): string | Promise<string | null> | null => {
    const data = localStorage.getItem(STORAGE_KEY);
    const info = JSON.parse(data ?? "") as AuthInfo;
    if (!info?.accessToken || !info?.refreshToken) {
        return null;
    }
    return info?.accessToken ?? null;
}

@Injectable({
    providedIn: "root"
})
export class AuthService {
    constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    }

    signIn(email: string, password: string): Observable<any> {
        return this.http.post<AuthInfo>(`${environment.apiUrl}/Auth/SignIn`, { email, password })
            .pipe(tap((response: AuthInfo) => {
                this.saveToken(response);
            }));
    }

    signUp(email: string, password: string): Observable<any> {
        return this.http.post<AuthInfo>(`${environment.apiUrl}/Auth/SignUp`, { email, password })
            .pipe(tap((response: AuthInfo) => {
                this.saveToken(response);
            }));
    }

    refreshToken(token: string): Observable<any> {
        return this.http.post(`${environment.apiUrl}/Auth/Refresh`, { token });
    }

    isAuthenticated(): boolean {
        const info = this.getToken();
        return !!(info?.accessToken && !this.jwtHelper.isTokenExpired(info?.accessToken));
    }

    getToken(): AuthInfo {
        const data = localStorage.getItem(STORAGE_KEY);
        const info = JSON.parse(data ?? "") as AuthInfo;
        return info
    }

    saveToken(token: AuthInfo) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(token));
    }

    getRole(): string | undefined {
        const info = this.getToken();

        console.log(this.jwtHelper.decodeToken(info?.accessToken))

        return "";// TODO: info?.user?.role;
    }

    signOutExternal() {
        localStorage.removeItem(STORAGE_KEY);
    }
}
