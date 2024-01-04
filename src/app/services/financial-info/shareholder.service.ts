import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EnvService } from '../env.service';

@Injectable({
  providedIn: 'root'
})
export class ShareholderService {

  API_FEATURE_NAME: String;

    constructor(
        private router: Router,
        private httpClient: HttpClient,
        private environment: EnvService
    ) {
        this.API_FEATURE_NAME = '/financial-info/shareholder';
    }

    save(shareholderList: any, companyInfoId: any, submitType: string): Observable<any> {
        const token = sessionStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        const formData: FormData = new FormData();
        formData.append('shareholderList', JSON.stringify(shareholderList));
        formData.append('companyInfoId', companyInfoId);
        formData.append('submitType', submitType);

        return this.httpClient.post(`${this.environment.apiURL}${this.API_FEATURE_NAME}/save`, formData, { headers: headers });
    }

    getList(companyInfoId: any): Observable<any> {
        const token = sessionStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        let params = new HttpParams();
        params = params.append('companyInfoId', companyInfoId);

        return this.httpClient.get(`${this.environment.apiURL}${this.API_FEATURE_NAME}/list`, { headers: headers, params: params });
    }
}
