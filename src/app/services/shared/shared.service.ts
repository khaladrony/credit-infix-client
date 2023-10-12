import { Injectable } from '@angular/core';
import { CompanyInfo } from 'src/app/models/financial-info/company-info.model';

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    message: string;
    companyInfo: CompanyInfo;
    
    constructor() { }

    setMessage(data: any) {
        this.message = data;
    }

    getMessage(){
        return this.message;
    }

    setCompanyInfoObject(companyInfo: CompanyInfo) {
        this.companyInfo = companyInfo;
    }

    getCompanyInfoObject(){
        return this.companyInfo;
    }
}
