import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompanyInfo } from 'src/app/models/financial-info/company-info.model';
import { CompanyInfoService } from 'src/app/services/financial-info/company-info.service';

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
        private companyInfoService: CompanyInfoService
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

    onSelectRow(companyInfo: CompanyInfo, index: number) {

        this.router.navigate(['admin/financial-info/company-info'], { queryParams: { data: JSON.stringify(companyInfo), type: 1 } });
    }

}
