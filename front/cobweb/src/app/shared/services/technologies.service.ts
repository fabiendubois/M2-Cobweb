import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TechnologiesService {
    constructor(private httpClient: HttpClient) {}

    findAll(): Observable<any> {
        return this.httpClient.get<any>(environment.apiUrl + 'technologies');
    }

    deleteById(id: number): Observable<any> {
        return this.httpClient.delete<any>(environment.apiUrl + 'technologies/' + id);
    }
}