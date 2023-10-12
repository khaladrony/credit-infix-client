import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyInfo } from 'src/app/models/financial-info/company-info.model';
import { EnvService } from '../env.service';
import { Contact } from 'src/app/models/financial-info/contact.model';

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    API_FEATURE_NAME: String;

    constructor(
        private router: Router,
        private httpClient: HttpClient,
        private environment: EnvService
    ) {
        this.API_FEATURE_NAME = '/financial-info/contact';
    }

    create(contact: Contact): Observable<any> {
        const token = sessionStorage.getItem("token");
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });

        const formData: FormData = new FormData();
        formData.append('contactDTO', JSON.stringify(contact));

        return this.httpClient.post(`${this.environment.apiURL}${this.API_FEATURE_NAME}/add`, formData, { headers: headers });
    }


    update(contact: Contact): Observable<any> {
        const token = sessionStorage.getItem("token");
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });

        const formData: FormData = new FormData();
        formData.append('contactDTO', JSON.stringify(contact));

        return this.httpClient.put(`${this.environment.apiURL}${this.API_FEATURE_NAME}/update`, formData, { headers: headers });
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
