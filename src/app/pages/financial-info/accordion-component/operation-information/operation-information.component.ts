import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompanyInfo } from 'src/app/models/financial-info/company-info.model';
import { OperationInfo } from 'src/app/models/financial-info/operation-info.model';
import { ConfirmationModalService } from 'src/app/services/confirmation-modal/confirmation-modal.service';
import { ExcelUploadService } from 'src/app/services/excel-upload.service';
import { OperationInfoService } from 'src/app/services/financial-info/operation-info.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { StoredProcedureExecuteService } from 'src/app/services/stored-procedure-execute.service';

@Component({
    selector: 'app-operation-information',
    templateUrl: './operation-information.component.html',
    styleUrls: ['./operation-information.component.scss']
})
export class OperationInformationComponent implements OnInit {

    title: string;
    operationInfoList: OperationInfo[] = [];
    oldOperationInfoObj: OperationInfo;
    newOperationInfoObj: OperationInfo;
    companyInfo: CompanyInfo;
    templateBtnShow: boolean = false;

    constructor(
        private router: Router,
        private excelUploadService: ExcelUploadService,
        private loader: NgxSpinnerService,
        private notifyService: NotificationService,
        private sharedService: SharedService,
        private operationInfoService:OperationInfoService,
        private storedProcedureExecuteService: StoredProcedureExecuteService,
        private confirmationModalService: ConfirmationModalService
    ) {
        this.companyInfo = new CompanyInfo();
        this.companyInfo = this.sharedService.getCompanyInfoObject();
     }

    ngOnInit(): void {
        this.title = 'Operation Information';        
        this.getList();
    }

    getList() {
        this.loader.show();
        this.operationInfoService.getList(this.companyInfo.id).subscribe({
            next: (data) => {
                this.operationInfoList = data.data;
            },
            complete: () => {
                this.operationInfoList.forEach(obj => {
                    obj.isEdit = false;   
                });

                this.templateButtonActivate()
                this.loader.hide();
            },
            error: (err) => {
                console.log(err);
                this.loader.hide();
            },
        });
    }

    templateButtonActivate() {
        if (this.operationInfoList.length == 0
            && this.companyInfo.id > 0) {
            this.templateBtnShow = true;
        }
    }

    addTemplate() {
        let templateName = 'operation_info';
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
        this.operationInfoList.forEach(obj => {
            obj.companyInfo = this.companyInfo;
        });
        
        this.setSequence();

        if (this.operationInfoList.length > 0) {
            this.loader.show();

            this.operationInfoService.save(this.operationInfoList, this.companyInfo.id).subscribe({
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
                    this.operationInfoService.delete(id).subscribe({
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

    setSequence() {
        let previousObj = new OperationInfo();
        let i = 0;
        let sequence = 1;
        this.operationInfoList.forEach(obj => {

            if (i == 0) {
                obj.sequence = sequence;
                previousObj = obj;
            } else if (previousObj.itemCode === obj.itemCode) {
                obj.sequence = sequence;
                previousObj = obj;
            } else {
                sequence++;
                obj.sequence = sequence;
                previousObj = obj;
            }
            i++;
        });
    }

    onEdit(operationInfoObj: OperationInfo) {
        this.oldOperationInfoObj = operationInfoObj;
        this.operationInfoList.forEach(obj => {
            obj.isEdit = false;
        });
        operationInfoObj.isEdit = true;

    }

    // onDelete(operationInfoObj: OperationInfo) {
    //     this.operationInfoList.splice(this.operationInfoList.findIndex(e => e.id === operationInfoObj.id), 1);
    // }

    onAdd() {
        this.oldOperationInfoObj = null;

        this.newOperationInfoObj = new OperationInfo();
        this.newOperationInfoObj.id = this.getId();
        this.newOperationInfoObj.itemCode = '';
        this.newOperationInfoObj.itemValue = '';
        this.newOperationInfoObj.isEdit = true;
        this.operationInfoList.push(this.newOperationInfoObj);



    }

    onUpdate(operationInfoObj: OperationInfo) {
        console.log(operationInfoObj);
        operationInfoObj.isEdit = false;
    }

    onCancel(operationInfoObj: OperationInfo) {
        if (this.oldOperationInfoObj == undefined || this.oldOperationInfoObj == null) {
            operationInfoObj.isEdit = true;
            this.operationInfoList.splice(this.operationInfoList.findIndex(e => e.id === operationInfoObj.id), 1);
        } else {

            operationInfoObj.itemCode = this.oldOperationInfoObj.itemCode;
            operationInfoObj.itemValue = this.oldOperationInfoObj.itemValue;
            operationInfoObj.isEdit = false;
        }

    }

    validateField(item: any) {
        if (item !== '') {
            return false;
        } else {
            return true;
        }

    }

    validateForm(operationInfoObj: OperationInfo) {
        if (operationInfoObj.itemCode === '' && operationInfoObj.itemValue === '') {
            return true;
        } else {
            return false;
        }
    }

    getId() {
        if (this.operationInfoList.length == 0) {
            return 1;
        } else {
            let lastOperationInfoObj: OperationInfo = this.operationInfoList[this.operationInfoList.length - 1];
            return lastOperationInfoObj.id + 1;
        }
    }

}
