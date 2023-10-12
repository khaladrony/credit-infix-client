import { Component, OnInit } from '@angular/core';
import { BasicInfo } from 'src/app/models/financial-info/basic-info.model';

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

    constructor() { }

    ngOnInit(): void {
        this.title = 'Basic Information';
        this.getBasicInfoList();
    }


    getBasicInfoList() {
        let basicInfoObj = new BasicInfo();
        basicInfoObj.itemCode = 'Name:';
        basicInfoObj.itemValue = 'Chiefway Katunayake (Private) Limited';  
        this.basicInfoList.push(basicInfoObj);

        basicInfoObj = new BasicInfo();
        basicInfoObj.itemCode = 'Established:';
        basicInfoObj.itemValue = '2017:';
        this.basicInfoList.push(basicInfoObj);

        basicInfoObj = new BasicInfo();
        basicInfoObj.itemCode = 'Legal Address:';
        basicInfoObj.itemValue = 'Ring Road 3, Phase II, EPZ, Katunayake, Sri Lanka';
        this.basicInfoList.push(basicInfoObj);

        basicInfoObj = new BasicInfo();
        basicInfoObj.itemCode = 'Operation Address:';
        basicInfoObj.itemValue= 'Ring Road 3, Phase II, EPZ, Katunayake, Sri Lanka';
        this.basicInfoList.push(basicInfoObj);

        basicInfoObj = new BasicInfo();
        basicInfoObj.itemCode = 'State:';
        basicInfoObj.itemValue= '';
        this.basicInfoList.push(basicInfoObj);

        basicInfoObj = new BasicInfo();
        basicInfoObj.itemCode = 'Main Activity:';
        basicInfoObj.itemValue= 'Manufacture, Import and Export of apparel';
        this.basicInfoList.push(basicInfoObj);

        basicInfoObj = new BasicInfo();
        basicInfoObj.itemCode = 'Legal Form:';
        basicInfoObj.itemValue= 'Private Limited Liability Company';
        this.basicInfoList.push(basicInfoObj);

        basicInfoObj = new BasicInfo();
        basicInfoObj.itemCode = 'Business Scale:';
        basicInfoObj.itemValue= 'Medium';
        this.basicInfoList.push(basicInfoObj);

        basicInfoObj = new BasicInfo();
        basicInfoObj.itemCode = 'Status:';
        basicInfoObj.itemValue= 'Active';
        this.basicInfoList.push(basicInfoObj);

        basicInfoObj = new BasicInfo();
        basicInfoObj.itemCode = 'Listed Status:';
        basicInfoObj.itemValue= 'Not Listed';
        this.basicInfoList.push(basicInfoObj);

        basicInfoObj = new BasicInfo();
        basicInfoObj.itemCode = 'Payment Practices:';
        basicInfoObj.itemValue= 'Payments Are Made Mostly According To Terms';
        this.basicInfoList.push(basicInfoObj);
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
