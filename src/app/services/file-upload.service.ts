import { Injectable } from '@angular/core';
import { EnvService } from './env.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileDetails } from '../models/file-details.model';

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {

    API_FEATURE_NAME: String;

    constructor(
        private httpClient: HttpClient,
        private environment: EnvService
    ) {
        this.API_FEATURE_NAME = '/api/file-upload';
    }


    uploadImage(formData: any): Observable<any> {
        const token = sessionStorage.getItem("token");
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });

        return this.httpClient.post(`${this.environment.apiURL}${this.API_FEATURE_NAME}/image`, formData, { headers: headers });
    }

    uploadFile(file: File): Observable<any> {
        const token = sessionStorage.getItem("token");
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });

        const formData: FormData = new FormData();
        formData.append('imageFile', file, file.name);
        return this.httpClient.post(`${this.environment.apiURL}${this.API_FEATURE_NAME}/file`, formData, { headers: headers });

    }

    imagePreview(fileName: any): Observable<any> {
        const token = sessionStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        let params = new HttpParams();
        params = params.append('fileName', fileName);
        return this.httpClient.get(`${this.environment.apiURL}${this.API_FEATURE_NAME}/image-preview`, { headers, responseType: 'blob', params });
    }
}
