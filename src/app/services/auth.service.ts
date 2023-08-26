import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

const STORAGE_KEY = 'user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) {
    }

    loginWithGoogle(credentials: string): Observable<User> {
        const header = new HttpHeaders().set('Content-type', 'application/json');
        return this.http.post(`${environment.apiUrl}/Auth/LoginWithGoogle`,
            JSON.stringify(credentials),
            {
                headers: header,
                withCredentials: true
            }).pipe(
                tap((response: User) => {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(response));
                })
            );
    }

    refreshToken(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/Auth/RefreshToken`, { withCredentials: true });
    }

    isAuthenticated(): boolean {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
            
            const user = JSON.parse(data) as User;
            console.log(user, user.tokenExpires, new Date(user.tokenExpires!) > new Date());
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

    authorizeFromRedirect(usr: string) {
        //parse the user from base 64
        const user = JSON.parse(atob(usr)) as User;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }
}
