import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EnvService } from '../env.service';

@Injectable({
    providedIn: 'root'
})
export class CurrencyDailyRateService {

    API_FEATURE_NAME: String;

    constructor(
        private router: Router,
        private httpClient: HttpClient,
        private environment: EnvService
    ) {
        this.API_FEATURE_NAME = '/financial-info/currency-daily-rate';
    }

    save(currencyDailyRateList: any, currencyDate: any): Observable<any> {
        const token = sessionStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        const formData: FormData = new FormData();
        formData.append('currencyDailyRateList', JSON.stringify(currencyDailyRateList));
        formData.append('currencyDate', currencyDate);

        return this.httpClient.post(`${this.environment.apiURL}${this.API_FEATURE_NAME}/save`, formData, { headers: headers });
    }

    getListByDate(currencyDate: any): Observable<any> {
        const token = sessionStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        let params = new HttpParams();
        params = params.append('currencyDate', currencyDate);
        // params = params.append('currencyDate', '2023-11-01');

        return this.httpClient.get(`${this.environment.apiURL}${this.API_FEATURE_NAME}/list-by-date`, { headers: headers, params: params });
    }

    getList(): Observable<any> {
        const token = sessionStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        return this.httpClient.get(`${this.environment.apiURL}${this.API_FEATURE_NAME}/list`, { headers: headers });
    }
}
