import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EnvService } from './env.service';

@Injectable({
    providedIn: 'root'
})
export class ExcelUploadService {

    API_FEATURE_NAME: String;

    constructor(
        private router: Router,
        private httpClient: HttpClient,
        private environment: EnvService
    ) {
        this.API_FEATURE_NAME = '/api/excel';
     }

    financialInformationFile(formData: any): Observable<any> {
        const token = sessionStorage.getItem("token");
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });

        return this.httpClient.post(`${this.environment.apiURL}${this.API_FEATURE_NAME}/financial-information`, formData, { headers: headers });
    }

    shareholderFile(formData: any): Observable<any> {
        const token = sessionStorage.getItem("token");
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });

        return this.httpClient.post(`${this.environment.apiURL}${this.API_FEATURE_NAME}/shareholder`, formData, { headers: headers });
    }

    managementFile(formData: any): Observable<any> {
        const token = sessionStorage.getItem("token");
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });

        return this.httpClient.post(`${this.environment.apiURL}${this.API_FEATURE_NAME}/management`, formData, { headers: headers });
    }
}
