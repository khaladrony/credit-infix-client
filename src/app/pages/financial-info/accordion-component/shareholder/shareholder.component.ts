import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompanyInfo } from 'src/app/models/financial-info/company-info.model';
import { Shareholder } from 'src/app/models/financial-info/shareholder.model';
import { ExcelUploadService } from 'src/app/services/excel-upload.service';
import { ShareholderService } from 'src/app/services/financial-info/shareholder.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
    selector: 'app-shareholder',
    templateUrl: './shareholder.component.html',
    styleUrls: ['./shareholder.component.scss']
})
export class ShareholderComponent implements OnInit {

    title: string;
    shareholderList: Shareholder[] = [];
    oldShareholderObj: Shareholder;
    newShareholderObj: Shareholder;
    trGroupMax: number;
    companyInfo: CompanyInfo;

    constructor(
        private router: Router,
        private excelUploadService: ExcelUploadService,
        private loader: NgxSpinnerService,
        private notifyService: NotificationService,
        private sharedService: SharedService,
        private shareholderService:ShareholderService
    ) {
        this.companyInfo = new CompanyInfo();
    }

    ngOnInit(): void {
        this.title = 'Shareholder';

        this.companyInfo = this.sharedService.getCompanyInfoObject();
        this.getList();

    }

    getList() {
        // let shareholderObj = new Shareholder();
        // shareholderObj.id = this.getId();
        // shareholderObj.itemCode = 'Name:';
        // shareholderObj.itemValue = 'Sterling Apparel Limited';
        // this.shareholderList.push(shareholderObj);

        // shareholderObj = new Shareholder();
        // shareholderObj.id = this.getId();
        // shareholderObj.itemCode = 'Share Amount:'
        // shareholderObj.itemValue = '69,619,000.00'
        // this.shareholderList.push(shareholderObj);

        // shareholderObj = new Shareholder();
        // shareholderObj.id = this.getId();
        // shareholderObj.itemCode = 'Share Percent:'
        // shareholderObj.itemValue = '100%'
        // this.shareholderList.push(shareholderObj);

        // shareholderObj = new Shareholder();
        // shareholderObj.id = this.getId();
        // shareholderObj.itemCode = 'Country:'
        // shareholderObj.itemValue = 'Hong Kong'
        // this.shareholderList.push(shareholderObj);

        this.loader.show();
        this.shareholderService.getList(this.companyInfo.id).subscribe({
            next: (data) => {
                this.shareholderList = data.data;
            },
            complete: () => {
                this.shareholderList.forEach(obj => {
                    obj.isEdit = false;
                });

                this.loader.hide();
            },
            error: (err) => {
                console.log(err);
                this.loader.hide();
            },
        });
    }

    onEdit(shareholderObj: Shareholder) {
        this.oldShareholderObj = shareholderObj;
        this.shareholderList.forEach(obj => {
            obj.isEdit = false;
        });
        shareholderObj.isEdit = true;

    }

    onDelete(shareholderObj: Shareholder) {
        this.shareholderList.splice(this.shareholderList.findIndex(e => e.id === shareholderObj.id), 1);
    }

    onAdd() {
        this.oldShareholderObj = null;

        this.newShareholderObj = new Shareholder();
        this.newShareholderObj.id = this.getId();
        this.newShareholderObj.itemCode = 'Name:';
        this.newShareholderObj.itemValue = '';
        this.newShareholderObj.isEdit = true;
        this.shareholderList.push(this.newShareholderObj);

        this.newShareholderObj = new Shareholder();
        this.newShareholderObj.id = this.getId();
        this.newShareholderObj.itemCode = 'Share Amount:';
        this.newShareholderObj.itemValue = '';
        this.newShareholderObj.isEdit = true;
        this.shareholderList.push(this.newShareholderObj);

        this.newShareholderObj = new Shareholder();
        this.newShareholderObj.id = this.getId();
        this.newShareholderObj.itemCode = 'Share Percent:';
        this.newShareholderObj.itemValue = '';
        this.newShareholderObj.isEdit = true;
        this.shareholderList.push(this.newShareholderObj);

        this.newShareholderObj = new Shareholder();
        this.newShareholderObj.id = this.getId();
        this.newShareholderObj.itemCode = 'Country:';
        this.newShareholderObj.itemValue = '';
        this.newShareholderObj.isEdit = true;
        this.shareholderList.push(this.newShareholderObj);


    }

    onUpdate(shareholderObj: Shareholder) {
        console.log(shareholderObj);
        shareholderObj.isEdit = false;
    }

    onCancel(shareholderObj: Shareholder) {
        if (this.oldShareholderObj == undefined || this.oldShareholderObj == null) {
            shareholderObj.isEdit = true;
            this.shareholderList.splice(this.shareholderList.findIndex(e => e.id === shareholderObj.id), 1);
        } else {

            shareholderObj.itemCode = this.oldShareholderObj.itemCode;
            shareholderObj.itemValue = this.oldShareholderObj.itemValue;
            shareholderObj.isEdit = false;
        }

    }

    onSave() {
        this.shareholderList.forEach(obj => {
            obj.companyInfo = this.companyInfo;
        });
        console.log(this.shareholderList);

        if (this.shareholderList.length > 0) {
            this.loader.show();

            this.shareholderService.save(this.shareholderList, this.companyInfo.id).subscribe({
                next: (response) => {
                    console.log(response);
                    this.notifyService.showSuccess("success", response.message);

                    this.router.navigate(["admin/financial-info"]);
                },
                complete: () => {
                    this.getList();
                    this.loader.hide();
                },
                error: (err) => {
                    console.log(err);
                    this.notifyService.showError("error", err.error?.message);
                    this.loader.hide();
                },
            });
        }
    }

    validateField(item: any) {
        if (item !== '') {
            return false;
        } else {
            return true;
        }

    }

    validateForm(shareholderObj: Shareholder) {
        if (shareholderObj.itemCode !== '' && shareholderObj.itemValue !== '') {
            return false;
        } else {
            return true;
        }
    }

    getId() {
        if (this.shareholderList.length == 0) {
            return 1;
        } else {
            let lastShareholderObj: Shareholder = this.shareholderList[this.shareholderList.length - 1];
            return lastShareholderObj.id + 1;
        }
    }

    // Excel upload    
    onExcelFileUpload(event: any) {
        let fileName = event.target.files[0].name;
        let regex = /(.xlsx|.xls)$/;
        this.shareholderList = [];

        if (regex.test(fileName.toLowerCase())) {
            let formData = new FormData();
            formData.append('file', event.target.files[0]);
            formData.append('fileName', event.target.files[0].name);
            formData.append('type', event.target.files[0].type);
            formData.append('size', event.target.files[0].size);

            this.loader.show();

            this.excelUploadService.shareholderFile(formData).subscribe({
                next: (response) => {
                    console.log(response);
                    this.shareholderList = response.data.responseDTOs;

                    this.trGroupMax = Math.max.apply(null, this.shareholderList.map(function (o) { return o.sequence; }));
                },
                complete: () => {
                    event.target.value = null;
                    this.loader.hide();
                },
                error: (err) => {
                    console.log(err);
                    this.loader.hide();
                    event.target.value = null;
                    this.notifyService.showError('error', err.error?.message);
                }
            });

        } else {
            this.notifyService.showError('error', 'Please upload a valid Excel file!');
            event.target.value = null;
            this.loader.hide();
        }
    }

    styleObject(index: number): Object {

        if (index == 1) {
            return { 'border-top': '2px solid  #e9ecef' };
        } else if (index % this.trGroupMax == 0) {
            return { 'border-bottom': '2px solid  #e9ecef' };
        }

    }

}
