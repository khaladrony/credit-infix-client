import { Component, OnInit } from '@angular/core';
import { RegistrationDetail } from 'src/app/models/financial-info/registration-detail.model';

@Component({
    selector: 'app-registration-details',
    templateUrl: './registration-details.component.html',
    styleUrls: ['./registration-details.component.scss']
})
export class RegistrationDetailsComponent implements OnInit {

    title: string;
    registrationDetailList: RegistrationDetail[] = [];
    oldRegistrationDetailObj: RegistrationDetail;
    newRegistrationDetailObj: RegistrationDetail;

    constructor() { }

    ngOnInit(): void {
        this.title = 'Registration Details';

        this.getRegistrationDetailList();
    }

    getRegistrationDetailList() {
        let registrationDetailObj = new RegistrationDetail();
        registrationDetailObj.id = this.getId();
        registrationDetailObj.item = 'Registration Information';
        registrationDetailObj.subItem = 'Registration Date';
        registrationDetailObj.itemValue = '31st March 2017';
        registrationDetailObj.isRowSpan = false;
        this.registrationDetailList.push(registrationDetailObj);

        registrationDetailObj = new RegistrationDetail();
        registrationDetailObj.id = this.getId();
        registrationDetailObj.item = '';
        registrationDetailObj.subItem = 'Company Registration No';
        registrationDetailObj.itemValue = 'AAD44882';
        registrationDetailObj.isRowSpan = true;
        this.registrationDetailList.push(registrationDetailObj);

        registrationDetailObj = new RegistrationDetail();
        registrationDetailObj.id = this.getId();
        registrationDetailObj.item = '';
        registrationDetailObj.subItem = 'Business Identification No(BIN)';
        registrationDetailObj.itemValue = 'NA';
        registrationDetailObj.isRowSpan = true;
        this.registrationDetailList.push(registrationDetailObj);

        registrationDetailObj = new RegistrationDetail();
        registrationDetailObj.id = this.getId();
        registrationDetailObj.item = '';
        registrationDetailObj.subItem = 'Import Registration Certificate No (IRC):';
        registrationDetailObj.itemValue = 'NA';
        registrationDetailObj.isRowSpan = true;
        this.registrationDetailList.push(registrationDetailObj);

        registrationDetailObj = new RegistrationDetail();
        registrationDetailObj.id = this.getId();
        registrationDetailObj.item = '';
        registrationDetailObj.subItem = 'Tax Identification No (TIN):';
        registrationDetailObj.itemValue = 'NA';
        registrationDetailObj.isRowSpan = true;
        this.registrationDetailList.push(registrationDetailObj);

        registrationDetailObj = new RegistrationDetail();
        registrationDetailObj.id = this.getId();
        registrationDetailObj.item = '';
        registrationDetailObj.subItem = 'BGMEA Reg. No:';
        registrationDetailObj.itemValue = 'NA';
        registrationDetailObj.isRowSpan = true;
        this.registrationDetailList.push(registrationDetailObj);

        registrationDetailObj = new RegistrationDetail();
        registrationDetailObj.id = this.getId();
        registrationDetailObj.item = 'Capital:';
        registrationDetailObj.subItem = 'Share Capital:';
        registrationDetailObj.itemValue = 'LKR 696,190,000.00';
        this.registrationDetailList.push(registrationDetailObj);

        registrationDetailObj = new RegistrationDetail();
        registrationDetailObj.id = this.getId();
        registrationDetailObj.item = '';
        registrationDetailObj.subItem = 'Number of Share:';
        registrationDetailObj.itemValue = 'LKR 69,619,000.00';
        this.registrationDetailList.push(registrationDetailObj);

        registrationDetailObj = new RegistrationDetail();
        registrationDetailObj.id = this.getId();
        registrationDetailObj.item = '';
        registrationDetailObj.subItem = 'Per Share Value:';
        registrationDetailObj.itemValue = 'NA';
        this.registrationDetailList.push(registrationDetailObj);

        registrationDetailObj = new RegistrationDetail();
        registrationDetailObj.id = this.getId();
        registrationDetailObj.item = 'Legal Status:';
        registrationDetailObj.subItem = '';
        registrationDetailObj.itemValue = 'Private Limited Liability Company';
        this.registrationDetailList.push(registrationDetailObj);

        registrationDetailObj = new RegistrationDetail();
        registrationDetailObj.id = this.getId();
        registrationDetailObj.item = 'Secretary';
        registrationDetailObj.subItem = '';
        registrationDetailObj.itemValue = 'Corporate Services (Private) Limited Address: No. 216, De Saram Place, Colombo–10, Sri Lanka';
        this.registrationDetailList.push(registrationDetailObj);

        registrationDetailObj = new RegistrationDetail();
        registrationDetailObj.id = this.getId();
        registrationDetailObj.item = 'Issuing Authority:';
        registrationDetailObj.subItem = '';
        registrationDetailObj.itemValue = 'The Department of the Registrar of Companies, Sri Lanka.';
        this.registrationDetailList.push(registrationDetailObj);
    }

    onEdit(registrationDetailObj: RegistrationDetail) {
        this.oldRegistrationDetailObj = registrationDetailObj;
        this.registrationDetailList.forEach(obj => {
            obj.isEdit = false;
        });
        registrationDetailObj.isEdit = true;

    }

    onDelete(registrationDetailObj: RegistrationDetail) {
        this.registrationDetailList.splice(this.registrationDetailList.findIndex(e => e.id === registrationDetailObj.id), 1);
    }

    onAdd() {
        this.oldRegistrationDetailObj = null;

        this.newRegistrationDetailObj = new RegistrationDetail();
        this.newRegistrationDetailObj.item = '';
        this.newRegistrationDetailObj.subItem = '';
        this.newRegistrationDetailObj.itemValue = '';
        this.newRegistrationDetailObj.isEdit = true;

        this.registrationDetailList.push(this.newRegistrationDetailObj);
    }

    addRow(index: number) {
        this.oldRegistrationDetailObj = null;

        this.newRegistrationDetailObj = new RegistrationDetail();
        this.newRegistrationDetailObj.item = '';
        this.newRegistrationDetailObj.subItem = '';
        this.newRegistrationDetailObj.itemValue = '';
        this.newRegistrationDetailObj.isEdit = true;

        this.registrationDetailList.splice(index + 1, 0, this.newRegistrationDetailObj);
    }

    onUpdate(registrationDetailObj: RegistrationDetail) {
        console.log(registrationDetailObj);
        registrationDetailObj.isEdit = false;
    }

    onCancel(registrationDetailObj: RegistrationDetail) {
        if (this.oldRegistrationDetailObj == undefined || this.oldRegistrationDetailObj == null) {
            registrationDetailObj.isEdit = true;
            this.registrationDetailList.splice(this.registrationDetailList.findIndex(e => e.id === registrationDetailObj.id), 1);
        } else {

            registrationDetailObj.item = this.oldRegistrationDetailObj.item;
            registrationDetailObj.subItem = this.oldRegistrationDetailObj.subItem;
            registrationDetailObj.itemValue = this.oldRegistrationDetailObj.itemValue;
            registrationDetailObj.isEdit = false;
        }

    }

    onSave() {
        this.registrationDetailList.forEach(obj => {
            obj.isEdit = false;
        });
        console.log(this.registrationDetailList);
    }

    validateField(item: any) {
        if (item !== '') {
            return false;
        } else {
            return true;
        }

    }

    validateForm(registrationDetailObj: RegistrationDetail) {
        if (registrationDetailObj.item == ''
            && registrationDetailObj.subItem == ''
            && registrationDetailObj.itemValue == '') {
            return true;
        } else {
            return false;
        }
    }

    getId() {
        if (this.registrationDetailList.length == 0) {
            return 1;
        } else {
            let lastRegistrationDetailObj: RegistrationDetail = this.registrationDetailList[this.registrationDetailList.length - 1];
            return lastRegistrationDetailObj.id + 1;
        }
    }

}
