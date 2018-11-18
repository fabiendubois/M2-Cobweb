import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private httpClient: HttpClient) { }

    sign_in(email: string, password: string): Observable<any> {
        return this.httpClient
            .post<any>(environment.apiUrl + 'users/sign_in', { email, password })
            .pipe(tap(result => {
                console.log(result.token);
                this.setToken(result.token)
            }));
    }

    getToken() {
        return sessionStorage.getItem('access_token');
    }

    sign_out() {
        sessionStorage.removeItem('access_token');
    }

    private setToken(result) {
        sessionStorage.setItem('access_token', result.token);
    }

}