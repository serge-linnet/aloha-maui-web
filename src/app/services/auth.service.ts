import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/user.model";
import { environment } from "src/environments/environment";

const STORAGE_KEY = "user";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    constructor(private http: HttpClient) {
    }

    signIn(email: string, password: string): Observable<any> {
        return this.http.post(`${environment.apiUrl}/Auth/SignIn`, { email, password }, { withCredentials: true })
            .pipe(tap((response: User) => {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(response));
            }));
    }

    signUp(email: string, password: string): Observable<any> {
        return this.http.post(`${environment.apiUrl}/Auth/SignUp`, { email, password }, { withCredentials: true })
            .pipe(tap((response: User) => {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(response));
            }));
    }

    refreshToken(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/Auth/RefreshToken`, { withCredentials: true });
    }

    isAuthenticated(): boolean {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
            const user = JSON.parse(data) as User;
            return !!(user && user.tokenExpires && new Date(user.tokenExpires) > new Date());
        }
        return false;
    }

    getRole(): string | undefined {
        const data = localStorage.getItem(STORAGE_KEY);
        const user = JSON.parse(data ?? "") as User;
        return user?.role;
    }

    signOutExternal() {
        localStorage.removeItem(STORAGE_KEY);
    }
}
