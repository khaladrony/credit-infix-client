import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EnvService } from './env.service';

@Injectable({
    providedIn: 'root'
})
export class StoredProcedureExecuteService {


    API_FEATURE_NAME: String;

    constructor(
        private router: Router,
        private httpClient: HttpClient,
        private environment: EnvService
    ) {
        this.API_FEATURE_NAME = '/api/stored-procedure-execute';
    }


    execute(templateName: string, companyInfoId: any): Observable<any> {
        const token = sessionStorage.getItem("token");
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });

        const formData: FormData = new FormData();
        formData.append('templateName', templateName);
        formData.append('companyInfoId', companyInfoId);

        return this.httpClient.post(`${this.environment.apiURL}${this.API_FEATURE_NAME}/data-insert`, formData, { headers: headers });
    }
}
