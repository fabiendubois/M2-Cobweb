import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApplicationsService {
    constructor(private httpClient: HttpClient) {}

    findAll(): Observable<any> {
        return this.httpClient.get<any>(environment.apiUrl + 'applications');
    }
    
}