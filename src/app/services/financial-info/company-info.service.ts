import { Injectable } from '@angular/core';
import { EnvService } from '../env.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { CompanyInfo } from 'src/app/models/financial-info/company-info.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CompanyInfoService {

    API_FEATURE_NAME: String;

    constructor(
        private router: Router,
        private httpClient: HttpClient,
        private environment: EnvService
    ) {
        this.API_FEATURE_NAME = '/financial-info/company-info';
    }

    create(companyInfo: CompanyInfo): Observable<any> {
        const token = sessionStorage.getItem("token");
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });

        const formData: FormData = new FormData();
        formData.append('companyInfoDTO', JSON.stringify(companyInfo));

        return this.httpClient.post(`${this.environment.apiURL}${this.API_FEATURE_NAME}/add`, formData, { headers: headers });
    }


    update(companyInfo: CompanyInfo): Observable<any> {
        const token = sessionStorage.getItem("token");
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });

        const formData: FormData = new FormData();
        formData.append('companyInfoDTO', JSON.stringify(companyInfo));

        return this.httpClient.put(`${this.environment.apiURL}${this.API_FEATURE_NAME}/update`, formData, { headers: headers });
    }


    delete(id: any): Observable<any> {
        const token = sessionStorage.getItem("token");
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });

        let params = new HttpParams();
        params = params.append('id', id);

        return this.httpClient.delete(`${this.environment.apiURL}${this.API_FEATURE_NAME}/delete`, { headers, params });
    }

    getList(formData: any): Observable<any> {
        const token = sessionStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        return this.httpClient.post(`${this.environment.apiURL}${this.API_FEATURE_NAME}/list`, formData, { headers: headers });
    }
}
