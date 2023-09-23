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

    excelFileUpload(formData: any): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        return this.httpClient.post(`${this.environment.apiURL}/api/excel/excel-upload`, formData, { headers: headers });
    }
}
