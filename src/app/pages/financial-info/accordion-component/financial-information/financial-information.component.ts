import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompanyInfo } from 'src/app/models/financial-info/company-info.model';
import { FinancialInformation } from 'src/app/models/financial-info/financial-information.model';
import { FinancialNote } from 'src/app/models/financial-info/financial-note.model';
import { ExcelUploadService } from 'src/app/services/excel-upload.service';
import { FinancialInformationService } from 'src/app/services/financial-info/financial-information.service';
import { FinancialNoteService } from 'src/app/services/financial-info/financial-note.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { StoredProcedureExecuteService } from 'src/app/services/stored-procedure-execute.service';

@Component({
    selector: 'app-financial-information',
    templateUrl: './financial-information.component.html',
    styleUrls: ['./financial-information.component.scss']
})
export class FinancialInformationComponent implements OnInit {

    title: string;
    firstRowData: string;
    financialInformationList: FinancialInformation[] = [];
    oldFinancialInformationObj: FinancialInformation;
    newFinancialInformationObj: FinancialInformation;

    financialNoteList: FinancialNote[] = [];
    oldFinancialNoteObj: FinancialNote;
    newFinancialNoteObj: FinancialNote;
    companyInfo: CompanyInfo;
    templateBtnShow: boolean = false;

    public FINANCIAL_INFO = 'FINANCIAL_INFO';
    public FINANCIAL_NOTE = 'FINANCIAL_NOTE';

    constructor(
        private router: Router,
        private excelUploadService: ExcelUploadService,
        private loader: NgxSpinnerService,
        private notifyService: NotificationService,
        private sharedService: SharedService,
        private financialInformationService: FinancialInformationService,
        private financialNoteService: FinancialNoteService,
        private storedProcedureExecuteService: StoredProcedureExecuteService
    ) {
        this.companyInfo = new CompanyInfo();
        this.companyInfo = this.sharedService.getCompanyInfoObject();
    }

    ngOnInit(): void {
        this.title = 'Financial Information';
        this.firstRowData = 'Figure in LKR - Million';

        this.getFinancialInformationList();
        this.getFinancialNoteList();
    }


    getFinancialInformationList() {        
        this.loader.show();
        this.financialInformationService.getList(this.companyInfo.id).subscribe({
            next: (data) => {
                this.financialInformationList = data.data;
            },
            complete: () => {
                this.financialInformationList.forEach(obj => {
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

    getFinancialNoteList() {
        this.loader.show();
        this.financialNoteService.getList(this.companyInfo.id).subscribe({
            next: (data) => {
                this.financialNoteList = data.data;
            },
            complete: () => {
                this.financialNoteList.forEach(obj => {
                    obj.isEdit = false;
                });

                this.templateButtonActivate();
                this.loader.hide();
            },
            error: (err) => {
                console.log(err);
                this.loader.hide();
            },
        });
    }


    templateButtonActivate() {
        if (this.financialNoteList.length == 0
            && this.companyInfo.id > 0) {
            this.templateBtnShow = true;
        }
    }

    addTemplate() {
        let templateName = 'financial_note';
        this.storedProcedureExecuteService.execute(templateName, this.companyInfo.id).subscribe({
            next: (response) => {
                console.log(response);
                this.notifyService.showSuccess("success", response.message);

                this.router.navigate(["admin/financial-info"]);
            },
            complete: () => {
                this.getFinancialNoteList();
                this.loader.hide();
            },
            error: (err) => {
                console.log(err);
                this.notifyService.showError("error", err.error?.message);
                this.loader.hide();
            },
        });
    }

    onSave(type: string) {
        if (this.FINANCIAL_NOTE && this.financialNoteList.length > 0) {
            this.loader.show();
            this.financialNoteList.forEach(obj => {
                obj.companyInfo = this.companyInfo;
            });

            this.financialNoteService.save(this.financialNoteList, this.companyInfo.id).subscribe({
                next: (response) => {
                    console.log(response);
                    this.notifyService.showSuccess("success", response.message);

                    this.router.navigate(["admin/financial-info"]);
                },
                complete: () => {
                    this.getFinancialNoteList();
                    this.loader.hide();
                },
                error: (err) => {
                    console.log(err);
                    this.notifyService.showError("error", err.error?.message);
                    this.loader.hide();
                },
            });
        } else if (this.FINANCIAL_INFO && this.financialInformationList.length > 0) {
            this.loader.show();
            this.financialInformationList.forEach(obj => {
                obj.companyInfo = this.companyInfo;
            });

            this.financialInformationService.save(this.financialInformationList, this.companyInfo.id).subscribe({
                next: (response) => {
                    console.log(response);
                    this.notifyService.showSuccess("success", response.message);

                    this.router.navigate(["admin/financial-info"]);
                },
                complete: () => {
                    this.getFinancialInformationList();
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

    onEdit(object: any, type: string) {
        if (type === this.FINANCIAL_INFO) {
            let financialInformationObj = object;
            this.oldFinancialInformationObj = financialInformationObj;
            this.financialInformationList.forEach(obj => {
                obj.isEdit = false;
            });
            financialInformationObj.isEdit = true;
        } else {
            let financialNoteObj = object;
            this.oldFinancialNoteObj = financialNoteObj;
            this.financialNoteList.forEach(obj => {
                obj.isEdit = false;
            });
            financialNoteObj.isEdit = true;
        }

    }

    onDelete(object: any, type: string) {
        if (type === this.FINANCIAL_INFO) {
            let financialInformationObj = object;
            this.financialInformationList.splice(this.financialInformationList.findIndex(e => e.id === financialInformationObj.id), 1);
        } else {
            let financialNoteObj = object;
            this.financialNoteList.splice(this.financialNoteList.findIndex(e => e.id === financialNoteObj.id), 1);
        }

    }

    onAdd() {
        this.oldFinancialInformationObj = null;

        this.newFinancialInformationObj = new FinancialInformation();
        this.newFinancialInformationObj.id = this.getId(this.FINANCIAL_INFO);
        this.newFinancialInformationObj.itemCode = '';
        this.newFinancialInformationObj.thirdYear = '';
        this.newFinancialInformationObj.secondYear = '';
        this.newFinancialInformationObj.firstYear = '';
        this.newFinancialInformationObj.isEdit = true;
        this.financialInformationList.push(this.newFinancialInformationObj);
    }

    addRow(index: number) {
        this.oldFinancialNoteObj = null;

        this.newFinancialNoteObj = new FinancialNote();
        this.newFinancialNoteObj.itemCode = '';
        this.newFinancialNoteObj.itemValue = '';
        this.newFinancialNoteObj.isEdit = true;

        this.financialNoteList.splice(index + 1, 0, this.newFinancialNoteObj);
    }

    onUpdate(object: any) {
        object.isEdit = false;
    }

    onCancel(object: any, type: string) {
        if (type === this.FINANCIAL_INFO) {
            let financialInformationObj = object;
            if (this.oldFinancialInformationObj == undefined || this.oldFinancialInformationObj == null) {
                financialInformationObj.isEdit = true;
                this.financialInformationList.splice(this.financialInformationList.findIndex(e => e.id === financialInformationObj.id), 1);
            } else {

                financialInformationObj.itemCode = this.oldFinancialInformationObj.itemCode;
                financialInformationObj.thirdYear = this.oldFinancialInformationObj.thirdYear;
                financialInformationObj.secondYear = this.oldFinancialInformationObj.secondYear;
                financialInformationObj.firstYear = this.oldFinancialInformationObj.firstYear;
                financialInformationObj.isEdit = false;
            }
        } else {
            let financialNoteObj = object;
            if (this.oldFinancialNoteObj == undefined || this.oldFinancialNoteObj == null) {
                financialNoteObj.isEdit = true;
                this.financialNoteList.splice(this.financialNoteList.findIndex(e => e.id === financialNoteObj.id), 1);
            } else {
                financialNoteObj.itemCode = this.oldFinancialNoteObj.itemCode;
                financialNoteObj.itemValue = this.oldFinancialNoteObj.itemValue;
                financialNoteObj.isEdit = false;
            }
        }

    }

    validateField(item: any) {
        if (item !== '') {
            return false;
        } else {
            return true;
        }

    }

    validateForm(object: any, type: string) {
        if (type === this.FINANCIAL_INFO) {
            let financialInformationObj = object;
            if (financialInformationObj.itemCode !== '') {
                return false;
            } else {
                return true;
            }
        } else {
            let financialNoteObj = object;
            if (financialNoteObj.itemCode !== '') {
                return false;
            } else {
                return true;
            }
        }
    }

    getId(type: string) {
        if (type === this.FINANCIAL_INFO) {
            if (this.financialInformationList.length == 0) {
                return 1;
            } else {
                let lastFinancialInformationObj: FinancialInformation = this.financialInformationList[this.financialInformationList.length - 1];
                return lastFinancialInformationObj.id + 1;
            }
        } else {
            if (this.financialNoteList.length == 0) {
                return 1;
            } else {
                let lastFinancialNoteObj: FinancialNote = this.financialNoteList[this.financialNoteList.length - 1];
                return lastFinancialNoteObj.id + 1;
            }
        }
    }



    // Excel upload    
    onExcelFileUpload(event: any) {
        let fileName = event.target.files[0].name;
        let regex = /(.xlsx|.xls)$/;
        this.financialInformationList = [];

        if (regex.test(fileName.toLowerCase())) {
            let formData = new FormData();
            formData.append('file', event.target.files[0]);
            formData.append('fileName', event.target.files[0].name);
            formData.append('type', event.target.files[0].type);
            formData.append('size', event.target.files[0].size);

            this.loader.show();

            this.excelUploadService.financialInformationFile(formData).subscribe({
                next: (response) => {
                    console.log(response);
                    this.financialInformationList = response.data.responseDTOs;
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

}
