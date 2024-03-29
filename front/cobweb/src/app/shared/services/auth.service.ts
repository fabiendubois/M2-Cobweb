import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private httpClient: HttpClient) { }

    sign_in(email: string, password: string): Observable<any> {
        return this.httpClient
            .post<any>(environment.apiUrl + 'users/sign_in', { email, password })
            .pipe(tap(result => {
                this.setToken(result.token);
            }));
    }

    sign_up(email: string, password: string, admin: boolean): Observable<any> {
        return this.httpClient.post<any>(environment.apiUrl + 'users/sign_up', { email, password, admin });
    }

    is_sign_in() {
        const jwtHelper = new JwtHelperService();
        const jwtToken = this.getToken();
        if (jwtToken) {
            if (!jwtHelper.isTokenExpired(jwtToken)) {
                return true;
            }
        }
        return false;
    }

    is_admin() {
        const jwtHelper = new JwtHelperService();
        const jwtToken = this.getToken();
        if (jwtToken) {
            const user_token = jwtHelper.decodeToken(jwtToken);
            console.log('User Token', user_token);
            if (user_token.admin === true) {
                return true;
            }
        }
        return false;
    }

    getToken() {
        return sessionStorage.getItem('access_token');
    }

    sign_out() {
        sessionStorage.removeItem('access_token');
    }

    private setToken(token) {
        sessionStorage.setItem('access_token', token);
    }

}