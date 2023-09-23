import { Component, OnInit } from '@angular/core';
import { OperationInfo } from 'src/app/models/financial-info/operation-info.model';

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

    constructor() { }

    ngOnInit(): void {
        this.title = 'Operation Information';

        this.getshareholderList();
    }

    getshareholderList() {
        let operationInfoObj = new OperationInfo();
        operationInfoObj.id = this.getId();
        operationInfoObj.itemCode = 'Activity Status :';
        operationInfoObj.itemValue = 'Active';
        this.operationInfoList.push(operationInfoObj);

        operationInfoObj = new OperationInfo();
        operationInfoObj.id = this.getId();
        operationInfoObj.itemCode = 'Activities:';
        operationInfoObj.itemValue = 'Manufacture, Import and Export';
        this.operationInfoList.push(operationInfoObj);

        operationInfoObj = new OperationInfo();
        operationInfoObj.id = this.getId();
        operationInfoObj.itemCode = 'NAICS Code :';
        operationInfoObj.itemValue = '315240 Womens, Girls, and Infants Cut and Sew Apparel Manufacturing 315220 Mens and Boys Cut and Sew Apparel Manufacturing';
        this.operationInfoList.push(operationInfoObj);

        operationInfoObj = new OperationInfo();
        operationInfoObj.id = this.getId();
        operationInfoObj.itemCode = 'Items Dealing In:';
        operationInfoObj.itemValue = 'Apparel products';
        this.operationInfoList.push(operationInfoObj);

        operationInfoObj = new OperationInfo();
        operationInfoObj.id = this.getId();
        operationInfoObj.itemCode = 'Export/Import Permit:';
        operationInfoObj.itemValue = 'Yes';
        this.operationInfoList.push(operationInfoObj);

        operationInfoObj = new OperationInfo();
        operationInfoObj.id = this.getId();
        operationInfoObj.itemCode = 'Purchasing Terms Domestic:';
        operationInfoObj.itemValue = 'Mostly within agreed terms, in individual cases installment payments';
        this.operationInfoList.push(operationInfoObj);

        operationInfoObj = new OperationInfo();
        operationInfoObj.id = this.getId();
        operationInfoObj.itemCode = 'Purchasing Terms International:';
        operationInfoObj.itemValue = 'Letter of Credit (At-sight/Defferd), Telegraphic Transfer (T/T).';
        this.operationInfoList.push(operationInfoObj);

        operationInfoObj = new OperationInfo();
        operationInfoObj.id = this.getId();
        operationInfoObj.itemCode = 'Export Market:';
        operationInfoObj.itemValue = '● Australia ● Hong–Kong ●  USA';
        this.operationInfoList.push(operationInfoObj);

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
        this.newOperationInfoObj.itemCode = ':';
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

    onSave() {
        this.operationInfoList.forEach(obj => {
            obj.isEdit = false;
        });
        console.log(this.operationInfoList);
    }

    validateField(item: any) {
        if (item !== '') {
            return false;
        } else {
            return true;
        }

    }

    validateForm(operationInfoObj: OperationInfo) {
        if (operationInfoObj.itemCode !== '' && operationInfoObj.itemValue !== '') {
            return false;
        } else {
            return true;
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
