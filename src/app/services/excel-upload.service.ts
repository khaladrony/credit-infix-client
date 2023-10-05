import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EnvService } from './env.service';

@Injectable({
    providedIn: 'root'
})
export class ExcelUploadService {

    constructor(
        private router: Router,
        private httpClient: HttpClient,
        private environment: EnvService
    ) { }

    financialInformationFile(formData: any): Observable<any> {
        const token = sessionStorage.getItem("token");
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });

        return this.httpClient.post(`${this.environment.apiURL}/api/excel/financial-information`, formData, { headers: headers });
    }

    shareholderFile(formData: any): Observable<any> {
        const token = sessionStorage.getItem("token");
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });

        return this.httpClient.post(`${this.environment.apiURL}/api/excel/shareholder`, formData, { headers: headers });
    }

    managementFile(formData: any): Observable<any> {
        const token = sessionStorage.getItem("token");
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });

        return this.httpClient.post(`${this.environment.apiURL}/api/excel/management`, formData, { headers: headers });
    }
}
