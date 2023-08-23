import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private configService: ConfigService, private http: HttpClient) { }

    loginWithGoogle(credentials: string): Observable<any> {
        console.debug("loginWithGoogle");
        const config = this.configService.getConfig();

        const header = new HttpHeaders().set('Content-type', 'application/json');
        return this.http.post(`${config.apiUrl}/Auth/LoginWithGoogle`,
            JSON.stringify(credentials),
            {
                headers: header,
                withCredentials: true
            });
    }

    signOutExternal() {
        localStorage.removeItem("token");
        console.log("token deleted")
    }
}
