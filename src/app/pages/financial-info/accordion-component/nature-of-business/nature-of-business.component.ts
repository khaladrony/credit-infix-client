import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompanyInfo } from 'src/app/models/financial-info/company-info.model';
import { NatureOfBusiness } from 'src/app/models/financial-info/nature-of-business.model';
import { ConfirmationModalService } from 'src/app/services/confirmation-modal/confirmation-modal.service';
import { ExcelUploadService } from 'src/app/services/excel-upload.service';
import { NatureOfBusinessService } from 'src/app/services/financial-info/nature-of-business.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { StoredProcedureExecuteService } from 'src/app/services/stored-procedure-execute.service';

@Component({
    selector: 'app-nature-of-business',
    templateUrl: './nature-of-business.component.html',
    styleUrls: ['./nature-of-business.component.scss']
})
export class NatureOfBusinessComponent implements OnInit {

    title: string;
    natureOfBusinessList: NatureOfBusiness[] = [];
    oldNatureOfBusinessObj: NatureOfBusiness;
    newNatureOfBusinessObj: NatureOfBusiness;
    companyInfo: CompanyInfo;
    templateBtnShow: boolean = false;

    constructor(
        private router: Router,
        private excelUploadService: ExcelUploadService,
        private loader: NgxSpinnerService,
        private notifyService: NotificationService,
        private sharedService: SharedService,
        private natureOfBusinessService: NatureOfBusinessService,
        private storedProcedureExecuteService: StoredProcedureExecuteService,
        private confirmationModalService: ConfirmationModalService
    ) {
        this.companyInfo = new CompanyInfo();
        this.companyInfo = this.sharedService.getCompanyInfoObject();
    }

    ngOnInit(): void {
        this.title = 'Nature Of Business';        
        this.getList();
    }

    getList() {
        this.loader.show();
        this.natureOfBusinessService.getList(this.companyInfo.id).subscribe({
            next: (data) => {
                this.natureOfBusinessList = data.data;
            },
            complete: () => {
                this.natureOfBusinessList.forEach(obj => {
                    obj.isEdit = false;
                    if(obj.itemCode === 'Business Activity:'){
                        obj.itemValue = obj.companyInfo.businessType;
                    }                    
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
        if (this.natureOfBusinessList.length == 0
            && this.companyInfo.id > 0) {
            this.templateBtnShow = true;
        }
    }

    addTemplate() {
        let templateName = 'nature_of_business';
        this.storedProcedureExecuteService.execute(templateName, this.companyInfo.id).subscribe({
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

    onSave() {
        this.natureOfBusinessList.forEach(obj => {
            obj.companyInfo = this.companyInfo;
        });
        console.log(this.natureOfBusinessList);

        if (this.natureOfBusinessList.length > 0) {
            this.loader.show();

            this.natureOfBusinessService.save(this.natureOfBusinessList, this.companyInfo.id).subscribe({
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

    onDelete(id: any) {
        this.confirmationModalService
            .confirm("Delete confirmation!", "Are you sure you want to delete?")
            .subscribe((answer) => {
                if (answer === "yes") {
                    this.natureOfBusinessService.delete(id).subscribe({
                        next: () => {
                            this.notifyService.showSuccess(
                                "success",
                                "Deleted Successfully."
                            );

                            this.router.navigate(["admin/financial-info"]);
                        },
                        complete: () => {
                            this.getList();
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

    onEdit(natureOfBusinessObj: NatureOfBusiness) {
        this.oldNatureOfBusinessObj = natureOfBusinessObj;
        this.natureOfBusinessList.forEach(obj => {
            obj.isEdit = false;
        });
        natureOfBusinessObj.isEdit = true;

    }

    // onDelete(natureOfBusinessObj: NatureOfBusiness) {
    //     this.natureOfBusinessList.splice(this.natureOfBusinessList.findIndex(e => e.id === natureOfBusinessObj.id), 1);
    // }

    onAdd() {
        this.oldNatureOfBusinessObj = null;

        this.newNatureOfBusinessObj = new NatureOfBusiness();
        this.newNatureOfBusinessObj.id = this.getId();
        this.newNatureOfBusinessObj.itemCode = '';
        this.newNatureOfBusinessObj.itemValue = '';
        this.newNatureOfBusinessObj.isEdit = true;
        this.natureOfBusinessList.push(this.newNatureOfBusinessObj);



    }

    onUpdate(natureOfBusinessObj: NatureOfBusiness) {
        console.log(natureOfBusinessObj);
        natureOfBusinessObj.isEdit = false;
    }

    onCancel(natureOfBusinessObj: NatureOfBusiness) {
        if (this.oldNatureOfBusinessObj == undefined || this.oldNatureOfBusinessObj == null) {
            natureOfBusinessObj.isEdit = true;
            this.natureOfBusinessList.splice(this.natureOfBusinessList.findIndex(e => e.id === natureOfBusinessObj.id), 1);
        } else {

            natureOfBusinessObj.itemCode = this.oldNatureOfBusinessObj.itemCode;
            natureOfBusinessObj.itemValue = this.oldNatureOfBusinessObj.itemValue;
            natureOfBusinessObj.isEdit = false;
        }

    }

    validateField(item: any) {
        if (item !== '') {
            return false;
        } else {
            return true;
        }

    }

    validateForm(natureOfBusinessObj: NatureOfBusiness) {
        if (natureOfBusinessObj.itemCode == '' && natureOfBusinessObj.itemValue == '') {
            return true;
        } else {
            return false;
        }
    }

    getId() {
        if (this.natureOfBusinessList.length == 0) {
            return 1;
        } else {
            let lastNatureOfBusinessObj: NatureOfBusiness = this.natureOfBusinessList[this.natureOfBusinessList.length - 1];
            return lastNatureOfBusinessObj.id + 1;
        }
    }

}
