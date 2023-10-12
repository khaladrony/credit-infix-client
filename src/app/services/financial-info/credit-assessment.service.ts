import { Injectable } from '@angular/core';
import { EnvService } from '../env.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CreditAssessmentService {

    API_FEATURE_NAME: String;

    constructor(
        private router: Router,
        private httpClient: HttpClient,
        private environment: EnvService
    ) {
        this.API_FEATURE_NAME = '/financial-info/credit-assessment';
    }

    getInfo(id: any): Observable<any> {
        const token = sessionStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        let params = new HttpParams();
        params = params.append('id', id);

        return this.httpClient.get(`${this.environment.apiURL}${this.API_FEATURE_NAME}/info`, { headers: headers, params: params });
    }
}
