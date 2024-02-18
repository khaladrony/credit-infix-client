import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompanyInfo } from 'src/app/models/financial-info/company-info.model';
import { ConfirmationModalService } from 'src/app/services/confirmation-modal/confirmation-modal.service';
import { CompanyInfoService } from 'src/app/services/financial-info/company-info.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
    selector: 'app-company-list',
    templateUrl: './company-list.component.html',
    styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

    companyInfoList: CompanyInfo[] = [];

    constructor(
        private router: Router,
        private loader: NgxSpinnerService,
        private companyInfoService: CompanyInfoService,
        private confirmationModalService: ConfirmationModalService,
        private notifyService: NotificationService,
    ) { }

    ngOnInit(): void {

        this.loadListData();
    }


    loadListData() {
        let data = {};
        this.loader.show();
        this.companyInfoService.getList(data).subscribe({
            next: (data) => {
                this.companyInfoList = data.data;
            },
            complete: () => {
                this.loader.hide();
            },
            error: (err) => {
                console.log(err);
                this.loader.hide();
            },
        });
    }

    onSelectRow(companyInfo: CompanyInfo) {

        this.router.navigate(['admin/financial-info/company-info'], { queryParams: { data: JSON.stringify(companyInfo), type: 1 } });
    }

    // preview(companyInfo: CompanyInfo) {
    //     this.router.navigate(['admin/main-report'], { queryParams: { data: JSON.stringify(companyInfo), type: 1 } });
    // }

    preview(companyInfo: CompanyInfo) {
        const baseURL = location.origin;
        // const url = baseURL + '/#/admin/main-report';
        //For local
        // const url = baseURL + '/#/admin/main-report';
        //For remote 
        const url = baseURL + '/credit-infix/#/admin/main-report';

        // this.router.navigate(['admin/main-report']);
        const queryParams = { data: JSON.stringify(companyInfo) };
        // Then, construct the URL with query parameters
        const queryParamsString = new URLSearchParams(queryParams).toString();
        const fullUrl = `${url}?${queryParamsString}`;

        // Finally, open the URL in a new tab
        window.open(fullUrl, '_blank');
    }



    openNewTab(companyInfo: CompanyInfo) {
        // const url = this.router.serializeUrl(
        //     this.router.createUrlTree(['admin/main-report'])
        // );
        // window.open(url, '_blank');


        // const queryParams = { data: JSON.stringify(companyInfo), type: 1 };
        // const queryParamString = Object.keys(queryParams).map(key => `${key}=${encodeURIComponent(queryParams[key])}`).join('&');
        // const url = this.router.serializeUrl(
        //     this.router.createUrlTree(['admin/main-report'], { queryParams })
        // );
        // window.open(url, '_blank');

        // console.log(location.origin);
        // const queryParams = { data: JSON.stringify(companyInfo), type: 1 };
        // const url = this.router.createUrlTree(['http://localhost:4200/#/admin/main-report'], { queryParams }).toString();

        const baseURL = location.origin;
        //For local
        // const url = baseURL + '/#/admin/main-report';
        //For remote 
        const url = baseURL + '/credit-infix/#/admin/main-report';
        // this.router.navigate(['admin/main-report'], { queryParams: { data: JSON.stringify(companyInfo), type: 1 } });
        // window.open(url, '_blank');

        // this.router.navigate(['admin/main-report']);
        const queryParams = { data: JSON.stringify(companyInfo) };
        // Then, construct the URL with query parameters
        const queryParamsString = new URLSearchParams(queryParams).toString();
        const fullUrl = `${url}?${queryParamsString}`;

        // Finally, open the URL in a new tab
        window.open(fullUrl, '_blank');

    }

    onDelete(id: any) {
        this.confirmationModalService
            .confirm("Delete confirmation!", "Are you sure you want to delete?")
            .subscribe((answer) => {
                if (answer === "yes") {
                    this.companyInfoService.delete(id).subscribe({
                        next: () => {
                            this.notifyService.showSuccess(
                                "success",
                                "Deleted Successfully."
                            );

                            this.router.navigate(["admin/company-list"]);
                        },
                        complete: () => {
                            this.loadListData();
                            this.loader.hide();
                        },
                        error: (err) => {
                            this.notifyService.showError("error", err.message);
                            console.log(err);
                        },
                    });
                } else {
                    return;
                }
            });
    }

}
