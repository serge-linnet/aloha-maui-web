import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ConfigService } from './config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';

const STORAGE_KEY = 'user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private configService: ConfigService, private http: HttpClient) {
    }

    loginWithGoogle(credentials: string): Observable<User> {
        const config = this.configService.getConfig();

        const header = new HttpHeaders().set('Content-type', 'application/json');
        return this.http.post(`${config.apiUrl}/Auth/LoginWithGoogle`,
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
