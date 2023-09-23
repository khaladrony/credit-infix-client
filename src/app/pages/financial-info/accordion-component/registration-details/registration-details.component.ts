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
        registrationDetailObj.item='Registration Information'
        registrationDetailObj.subItem='Registration Date'
        registrationDetailObj.itemValue='31st March 2017'
        this.registrationDetailList.push(registrationDetailObj);

        registrationDetailObj = new RegistrationDetail();
        registrationDetailObj.item='Registration Information'
        registrationDetailObj.subItem='Company Registration No'
        registrationDetailObj.itemValue='AAD44882'
        this.registrationDetailList.push(registrationDetailObj);

        registrationDetailObj = new RegistrationDetail();
        registrationDetailObj.item='Registration Information'
        registrationDetailObj.subItem='Business Identification No(BIN)'
        registrationDetailObj.itemValue='NA'
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
        this.registrationDetailList.splice(this.registrationDetailList.findIndex(e => e.item === registrationDetailObj.item),1);
    }

    onAdd() {
        this.oldRegistrationDetailObj = null;

        this.newRegistrationDetailObj = new RegistrationDetail();
        this.newRegistrationDetailObj.item='';
        this.newRegistrationDetailObj.subItem='';
        this.newRegistrationDetailObj.itemValue='';
        this.newRegistrationDetailObj.isEdit=true;

        this.registrationDetailList.push(this.newRegistrationDetailObj);
    }

    onUpdate(registrationDetailObj: RegistrationDetail) {
        console.log(registrationDetailObj);
        registrationDetailObj.isEdit = false;
    }

    onCancel(registrationDetailObj: RegistrationDetail) {
        if (this.oldRegistrationDetailObj == undefined || this.oldRegistrationDetailObj == null) {
            registrationDetailObj.isEdit = true;
            this.registrationDetailList.splice(this.registrationDetailList.findIndex(e => e.item === registrationDetailObj.item),1);
        } else {
           
            registrationDetailObj.item = this.oldRegistrationDetailObj.item;
            registrationDetailObj.subItem = this.oldRegistrationDetailObj.subItem;
            registrationDetailObj.itemValue = this.oldRegistrationDetailObj.itemValue;
            registrationDetailObj.isEdit = false;
        }

    }

    onSave(){
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
        if (registrationDetailObj.item !== '' && registrationDetailObj.subItem !== '') {
            return false;
        } else {
            return true;
        }
    }

}
