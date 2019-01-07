import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FlowsService {
    constructor(private httpClient: HttpClient) { }

    findAll(): Observable<any> {
        return this.httpClient.get<any>(environment.apiUrl + 'flows');
    }

    add(flow: any): Observable<any> {
        return this.httpClient.post<any>(environment.apiUrl + 'flows', flow);
    }

    /*
    updateById(technology: any): Observable<any> {
        return this.httpClient.put<any>(environment.apiUrl + 'technologies', technology);
    }
*/
    deleteById(id: number): Observable<any> {
        return this.httpClient.delete<any>(environment.apiUrl + 'technologies/' + id);
    }
}