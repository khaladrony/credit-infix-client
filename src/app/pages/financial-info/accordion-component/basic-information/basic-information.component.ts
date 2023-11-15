import { Component, OnInit } from '@angular/core';
import { BasicInfo } from 'src/app/models/financial-info/basic-info.model';
import { CompanyInfo } from 'src/app/models/financial-info/company-info.model';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
    selector: 'app-basic-information',
    templateUrl: './basic-information.component.html',
    styleUrls: ['./basic-information.component.scss']
})
export class BasicInformationComponent implements OnInit {

    title: string;
    basicInfoList: BasicInfo[] = [];
    oldBasicInfoObj: BasicInfo;
    basicInfoNewObj: BasicInfo;
    companyInfo: CompanyInfo;

    constructor(
        private sharedService: SharedService,
    ) {
        this.companyInfo = new CompanyInfo();
        this.companyInfo = this.sharedService.getCompanyInfoObject();
     }

    ngOnInit(): void {
        this.title = 'Basic Information';        
        this.getBasicInfoList(this.companyInfo);
    }


    getBasicInfoList(companyInfo: CompanyInfo) {
        let basicInfoObj = new BasicInfo();
        basicInfoObj.itemCode = 'Name:';
        basicInfoObj.itemValue = this.getCapitalize(companyInfo.name);
        this.basicInfoList.push(basicInfoObj);

        basicInfoObj = new BasicInfo();
        basicInfoObj.itemCode = 'Established:';
        basicInfoObj.itemValue = companyInfo.yearEstablished;
        this.basicInfoList.push(basicInfoObj);

        basicInfoObj = new BasicInfo();
        basicInfoObj.itemCode = 'Legal Address:';
        basicInfoObj.itemValue = companyInfo.legalAddress;
        this.basicInfoList.push(basicInfoObj);

        basicInfoObj = new BasicInfo();
        basicInfoObj.itemCode = 'Operation Address:';
        basicInfoObj.itemValue = companyInfo.operationAddress;
        this.basicInfoList.push(basicInfoObj);

        basicInfoObj = new BasicInfo();
        basicInfoObj.itemCode = 'Country:';
        basicInfoObj.itemValue = companyInfo.country;
        this.basicInfoList.push(basicInfoObj);

        basicInfoObj = new BasicInfo();
        basicInfoObj.itemCode = 'Main Activity:';
        basicInfoObj.itemValue = companyInfo.businessType;
        this.basicInfoList.push(basicInfoObj);

        basicInfoObj = new BasicInfo();
        basicInfoObj.itemCode = 'Legal Form:';
        basicInfoObj.itemValue = companyInfo.legalStatus;
        this.basicInfoList.push(basicInfoObj);

        basicInfoObj = new BasicInfo();
        basicInfoObj.itemCode = 'Business Scale:';
        basicInfoObj.itemValue = companyInfo.businessScale;
        this.basicInfoList.push(basicInfoObj);

        basicInfoObj = new BasicInfo();
        basicInfoObj.itemCode = 'Status:';
        basicInfoObj.itemValue = companyInfo.status;
        this.basicInfoList.push(basicInfoObj);

        basicInfoObj = new BasicInfo();
        basicInfoObj.itemCode = 'Listed Status:';
        basicInfoObj.itemValue = companyInfo.listedStatus;
        this.basicInfoList.push(basicInfoObj);

        basicInfoObj = new BasicInfo();
        basicInfoObj.itemCode = 'Payment Practices:';
        basicInfoObj.itemValue = companyInfo.paymentPractices;
        this.basicInfoList.push(basicInfoObj);
    }

    getCapitalize(sentence: string) {
        return sentence.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    }

    onEdit(basicInfoObj: BasicInfo) {
        this.oldBasicInfoObj = basicInfoObj;
        this.basicInfoList.forEach(obj => {
            obj.isEdit = false;
        });
        basicInfoObj.isEdit = true;

    }

    onDelete(basicInfoObj: BasicInfo) {
        this.basicInfoList.splice(this.basicInfoList.findIndex(e => e.itemCode === basicInfoObj.itemCode), 1);
    }

    onAdd() {
        this.oldBasicInfoObj = null;

        this.basicInfoNewObj = new BasicInfo();
        this.basicInfoNewObj.itemCode = '';
        this.basicInfoNewObj.itemValue = '';
        this.basicInfoNewObj.isEdit = true;

        this.basicInfoList.push(this.basicInfoNewObj);
    }

    onUpdate(basicInfoObj: BasicInfo) {
        console.log(basicInfoObj);
        basicInfoObj.isEdit = false;
    }

    onCancel(basicInfoObj: BasicInfo) {
        if (this.oldBasicInfoObj == undefined || this.oldBasicInfoObj == null) {
            basicInfoObj.isEdit = true;
            this.basicInfoList.splice(this.basicInfoList.findIndex(e => e.itemCode === basicInfoObj.itemCode), 1);
        } else {

            basicInfoObj.itemCode = this.oldBasicInfoObj.itemCode;
            basicInfoObj.itemValue = this.oldBasicInfoObj.itemValue;
            basicInfoObj.isEdit = false;
        }

    }

    onSave() {
        this.basicInfoList.forEach(obj => {
            obj.isEdit = false;
        });
        console.log(this.basicInfoList);
    }

    validateField(item: any) {
        if (item !== '') {
            return false;
        } else {
            return true;
        }

    }

    validateForm(basicInfoObj: BasicInfo) {
        if (basicInfoObj.itemCode !== '' && basicInfoObj.itemValue !== '') {
            return false;
        } else {
            return true;
        }
    }
}
