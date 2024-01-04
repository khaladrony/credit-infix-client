import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Bankers } from 'src/app/models/financial-info/bankers.model';
import { CompanyInfo } from 'src/app/models/financial-info/company-info.model';
import { ExcelUploadService } from 'src/app/services/excel-upload.service';
import { BankersService } from 'src/app/services/financial-info/bankers.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
    selector: 'app-bankers',
    templateUrl: './bankers.component.html',
    styleUrls: ['./bankers.component.scss']
})
export class BankersComponent implements OnInit {

    title: string;
    bankersList: Bankers[] = [];
    oldBankersObj: Bankers;
    newBankersObj: Bankers;
    trGroupMax: number;
    companyInfo: CompanyInfo;
    isUpdateMode: boolean = false;
    btnLabel: string = 'Save';

    constructor(
        private router: Router,
        private excelUploadService: ExcelUploadService,
        private loader: NgxSpinnerService,
        private notifyService: NotificationService,
        private sharedService: SharedService,
        private bankersService:BankersService
    ) { 
        this.companyInfo = new CompanyInfo();
        this.companyInfo = this.sharedService.getCompanyInfoObject();
    }

    ngOnInit(): void {
        this.title = 'Bankers';
        this.getList();
    }

    getList() {
        this.loader.show();
        this.bankersService.getList(this.companyInfo.id).subscribe({
            next: (data) => {
                this.bankersList = data.data;
            },
            complete: () => {
                this.bankersList.forEach(obj => {
                    obj.isEdit = false;
                });

                this.saveAndUpdateBtnChange();
                this.loader.hide();
            },
            error: (err) => {
                console.log(err);
                this.loader.hide();
            },
        });
    }

    saveAndUpdateBtnChange() {
        this.isUpdateMode = true;
        this.btnLabel = 'Update';
    }

    onEdit(bankersObj: Bankers) {
        this.oldBankersObj = bankersObj;
        this.bankersList.forEach(obj => {
            obj.isEdit = false;
        });
        bankersObj.isEdit = true;

    }

    onDelete(bankersObj: Bankers) {
        this.bankersList.splice(this.bankersList.findIndex(e => e.id === bankersObj.id), 1);
    }

    onAdd() {
        this.oldBankersObj = null;

        this.newBankersObj = new Bankers();
        this.newBankersObj.id = this.getId();
        this.newBankersObj.itemCode = 'Name:';
        this.newBankersObj.itemValue = '';
        this.newBankersObj.isEdit = true;
        this.bankersList.push(this.newBankersObj);

        this.newBankersObj = new Bankers();
        this.newBankersObj.id = this.getId();
        this.newBankersObj.itemCode = 'Branch:';
        this.newBankersObj.itemValue = '';
        this.newBankersObj.isEdit = true;
        this.bankersList.push(this.newBankersObj);

        this.newBankersObj = new Bankers();
        this.newBankersObj.id = this.getId();
        this.newBankersObj.itemCode = 'Address:';
        this.newBankersObj.itemValue = '';
        this.newBankersObj.isEdit = true;
        this.bankersList.push(this.newBankersObj);

        this.newBankersObj = new Bankers();
        this.newBankersObj.id = this.getId();
        this.newBankersObj.itemCode = 'SWIFT:';
        this.newBankersObj.itemValue = '';
        this.newBankersObj.isEdit = true;
        this.bankersList.push(this.newBankersObj);

    }

    onUpdate(bankersObj: Bankers) {
        console.log(bankersObj);
        bankersObj.isEdit = false;
    }

    onCancel(bankersObj: Bankers) {
        if (this.oldBankersObj == undefined || this.oldBankersObj == null) {
            bankersObj.isEdit = true;
            this.bankersList.splice(this.bankersList.findIndex(e => e.id === bankersObj.id), 1);
        } else {

            bankersObj.itemCode = this.oldBankersObj.itemCode;
            bankersObj.itemValue = this.oldBankersObj.itemValue;
            bankersObj.isEdit = false;
        }

    }

    onSave() {
        this.bankersList.forEach(obj => {
            obj.companyInfo = this.companyInfo;
        });
        console.log(this.bankersList);

        if (this.bankersList.length > 0) {
            this.loader.show();

            this.bankersService.save(this.bankersList, this.companyInfo.id, this.btnLabel).subscribe({
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

    validateForm(bankersObj: Bankers) {
        if (bankersObj.itemCode !== '' && bankersObj.itemValue !== '') {
            return false;
        } else {
            return true;
        }
    }

    getId() {
        if (this.bankersList.length == 0) {
            return 1;
        } else {
            let lastBankersObj: Bankers = this.bankersList[this.bankersList.length - 1];
            return lastBankersObj.id + 1;
        }
    }

    // Excel upload    
    onExcelFileUpload(event: any) {
        let fileName = event.target.files[0].name;
        let regex = /(.xlsx|.xls)$/;
        this.bankersList = [];

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
                    this.bankersList = response.data.responseDTOs;

                    this.trGroupMax = Math.max.apply(null, this.bankersList.map(function (o) { return o.sequence; }));
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
