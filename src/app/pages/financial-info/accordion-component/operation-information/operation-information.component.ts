import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompanyInfo } from 'src/app/models/financial-info/company-info.model';
import { OperationInfo } from 'src/app/models/financial-info/operation-info.model';
import { ExcelUploadService } from 'src/app/services/excel-upload.service';
import { OperationInfoService } from 'src/app/services/financial-info/operation-info.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SharedService } from 'src/app/services/shared/shared.service';

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

    constructor(
        private router: Router,
        private excelUploadService: ExcelUploadService,
        private loader: NgxSpinnerService,
        private notifyService: NotificationService,
        private sharedService: SharedService,
        private operationInfoService:OperationInfoService
    ) {
        this.companyInfo = new CompanyInfo();
     }

    ngOnInit(): void {
        this.title = 'Operation Information';

        this.companyInfo = this.sharedService.getCompanyInfoObject();
        this.getList();
    }

    getList() {
        // let operationInfoObj = new OperationInfo();
        // operationInfoObj.id = this.getId();
        // operationInfoObj.itemCode = 'Activity Status :';
        // operationInfoObj.itemValue = 'Active';
        // this.operationInfoList.push(operationInfoObj);

        // operationInfoObj = new OperationInfo();
        // operationInfoObj.id = this.getId();
        // operationInfoObj.itemCode = 'Activities:';
        // operationInfoObj.itemValue = this.companyInfo.businessType;
        // this.operationInfoList.push(operationInfoObj);

        // operationInfoObj = new OperationInfo();
        // operationInfoObj.id = this.getId();
        // operationInfoObj.itemCode = 'NAICS Code :';
        // operationInfoObj.itemValue = '315240 Womens, Girls, and Infants Cut and Sew Apparel Manufacturing 315220 Mens and Boys Cut and Sew Apparel Manufacturing';
        // this.operationInfoList.push(operationInfoObj);

        // operationInfoObj = new OperationInfo();
        // operationInfoObj.id = this.getId();
        // operationInfoObj.itemCode = 'Items Dealing In:';
        // operationInfoObj.itemValue = 'Apparel products';
        // this.operationInfoList.push(operationInfoObj);

        // operationInfoObj = new OperationInfo();
        // operationInfoObj.id = this.getId();
        // operationInfoObj.itemCode = 'Export/Import Permit:';
        // operationInfoObj.itemValue = 'Yes';
        // this.operationInfoList.push(operationInfoObj);

        // operationInfoObj = new OperationInfo();
        // operationInfoObj.id = this.getId();
        // operationInfoObj.itemCode = 'Purchasing Terms Domestic:';
        // operationInfoObj.itemValue = 'Mostly within agreed terms, in individual cases installment payments';
        // this.operationInfoList.push(operationInfoObj);

        // operationInfoObj = new OperationInfo();
        // operationInfoObj.id = this.getId();
        // operationInfoObj.itemCode = 'Purchasing Terms International:';
        // operationInfoObj.itemValue = 'Letter of Credit (At-sight/Defferd), Telegraphic Transfer (T/T).';
        // this.operationInfoList.push(operationInfoObj);

        // operationInfoObj = new OperationInfo();
        // operationInfoObj.id = this.getId();
        // operationInfoObj.itemCode = 'Export Market:';
        // operationInfoObj.itemValue = '● Australia ● Hong–Kong ●  USA';
        // this.operationInfoList.push(operationInfoObj);

        // operationInfoObj = new OperationInfo();
        // operationInfoObj.id = this.getId();
        // operationInfoObj.itemCode = 'Import Form:';
        // operationInfoObj.itemValue = '● China ● India ●  Thailand';
        // this.operationInfoList.push(operationInfoObj);

        this.loader.show();
        this.operationInfoService.getList(this.companyInfo.id).subscribe({
            next: (data) => {
                this.operationInfoList = data.data;
            },
            complete: () => {
                this.operationInfoList.forEach(obj => {
                    obj.isEdit = false;
                    // if(obj.itemCode === 'Activities:'){
                    //     obj.itemValue = obj.companyInfo.businessType;
                    // }
                    
                });

                this.loader.hide();
            },
            error: (err) => {
                console.log(err);
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

    onDelete(operationInfoObj: OperationInfo) {
        this.operationInfoList.splice(this.operationInfoList.findIndex(e => e.id === operationInfoObj.id), 1);
    }

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
