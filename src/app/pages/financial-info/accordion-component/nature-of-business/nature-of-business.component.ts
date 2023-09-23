import { Component, OnInit } from '@angular/core';
import { NatureOfBusiness } from 'src/app/models/financial-info/nature-of-business.model';

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

    constructor() { }

    ngOnInit(): void {
        this.title = 'Nature Of Business';

        this.getNatureOfBusinessList();
    }

    getNatureOfBusinessList() {
        let natureOfBusinessObj = new NatureOfBusiness();
        natureOfBusinessObj.id = this.getId();
        natureOfBusinessObj.itemCode = 'Business Activity:';
        natureOfBusinessObj.itemValue = 'Manufacture, Import and Export of apparel Products.';
        this.natureOfBusinessList.push(natureOfBusinessObj);

        natureOfBusinessObj = new NatureOfBusiness();
        natureOfBusinessObj.id = this.getId();
        natureOfBusinessObj.itemCode = 'Range of Products:';
        natureOfBusinessObj.itemValue = '● Blazers ●  Coats ● Jackets ● Pants ● Skirts';
        this.natureOfBusinessList.push(natureOfBusinessObj);

        natureOfBusinessObj = new NatureOfBusiness();
        natureOfBusinessObj.id = this.getId();
        natureOfBusinessObj.itemCode = 'Certifications:';
        natureOfBusinessObj.itemValue = 'NA';
        this.natureOfBusinessList.push(natureOfBusinessObj);

        natureOfBusinessObj = new NatureOfBusiness();
        natureOfBusinessObj.id = this.getId();
        natureOfBusinessObj.itemCode = 'Brands :';
        natureOfBusinessObj.itemValue = 'NA';
        this.natureOfBusinessList.push(natureOfBusinessObj);

        natureOfBusinessObj = new NatureOfBusiness();
        natureOfBusinessObj.id = this.getId();
        natureOfBusinessObj.itemCode = 'Group Name::';
        natureOfBusinessObj.itemValue = 'NA';
        this.natureOfBusinessList.push(natureOfBusinessObj);

        

    }

    onEdit(natureOfBusinessObj: NatureOfBusiness) {
        this.oldNatureOfBusinessObj = natureOfBusinessObj;
        this.natureOfBusinessList.forEach(obj => {
            obj.isEdit = false;
        });
        natureOfBusinessObj.isEdit = true;

    }

    onDelete(natureOfBusinessObj: NatureOfBusiness) {
        this.natureOfBusinessList.splice(this.natureOfBusinessList.findIndex(e => e.id === natureOfBusinessObj.id), 1);
    }

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

    onSave() {
        this.natureOfBusinessList.forEach(obj => {
            obj.isEdit = false;
        });
        console.log(this.natureOfBusinessList);
    }

    validateField(item: any) {
        if (item !== '') {
            return false;
        } else {
            return true;
        }

    }

    validateForm(natureOfBusinessObj: NatureOfBusiness) {
        if (natureOfBusinessObj.itemCode !== '' && natureOfBusinessObj.itemValue !== '') {
            return false;
        } else {
            return true;
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
