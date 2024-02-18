import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CompanyInfo } from 'src/app/models/financial-info/company-info.model';

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    message: string;
    companyInfo: CompanyInfo;
    dataSubject = new BehaviorSubject<CompanyInfo>(null);

    constructor() { }

    setMessage(data: any) {
        this.message = data;
    }

    getMessage() {
        return this.message;
    }

    setCompanyInfoObject(companyInfo: CompanyInfo) {
        this.companyInfo = companyInfo;
    }

    getCompanyInfoObject() {
        return this.companyInfo;
    }

    // setData(companyInfo: CompanyInfo): void {
    //     this.dataSubject.next(companyInfo);
    //   }

    //   getData$(): Observable<CompanyInfo> {
    //     return this.dataSubject.asObservable();
    //   }

    // Expose the BehaviorSubject as an observable for components to subscribe
    data$ = this.dataSubject.asObservable();

    // Method to update the data in the BehaviorSubject
    updateData(companyInfo: CompanyInfo) {
        this.dataSubject.next(companyInfo);
    }
}
