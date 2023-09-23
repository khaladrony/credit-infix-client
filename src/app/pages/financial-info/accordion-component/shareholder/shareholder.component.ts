import { Component, OnInit } from '@angular/core';
import { Shareholder } from 'src/app/models/financial-info/shareholder.model';

@Component({
    selector: 'app-shareholder',
    templateUrl: './shareholder.component.html',
    styleUrls: ['./shareholder.component.scss']
})
export class ShareholderComponent implements OnInit {

    title: string;
    shareholderList: Shareholder[] = [];
    oldShareholderObj: Shareholder;
    newShareholderObj: Shareholder;

    constructor() { }

    ngOnInit(): void {
        this.title = 'Shareholder';

        this.getshareholderList();
    }

    getshareholderList() {
        let shareholderObj = new Shareholder();
        shareholderObj.id = this.getId();
        shareholderObj.itemCode = 'Name:';
        shareholderObj.itemValue = 'Sterling Apparel Limited';
        this.shareholderList.push(shareholderObj);

        shareholderObj = new Shareholder();
        shareholderObj.id = this.getId();
        shareholderObj.itemCode = 'Share Amount:'
        shareholderObj.itemValue = '69,619,000.00'
        this.shareholderList.push(shareholderObj);

        shareholderObj = new Shareholder();
        shareholderObj.id = this.getId();
        shareholderObj.itemCode = 'Share Percent:'
        shareholderObj.itemValue = '100%'
        this.shareholderList.push(shareholderObj);

        shareholderObj = new Shareholder();
        shareholderObj.id = this.getId();
        shareholderObj.itemCode = 'Country:'
        shareholderObj.itemValue = 'Hong Kong'
        this.shareholderList.push(shareholderObj);
    }

    onEdit(shareholderObj: Shareholder) {
        this.oldShareholderObj = shareholderObj;
        this.shareholderList.forEach(obj => {
            obj.isEdit = false;
        });
        shareholderObj.isEdit = true;

    }

    onDelete(shareholderObj: Shareholder) {
        this.shareholderList.splice(this.shareholderList.findIndex(e => e.id === shareholderObj.id), 1);
    }

    onAdd() {
        this.oldShareholderObj = null;

        this.newShareholderObj = new Shareholder();
        this.newShareholderObj.id = this.getId();
        this.newShareholderObj.itemCode = 'Name:';
        this.newShareholderObj.itemValue = '';
        this.newShareholderObj.isEdit = true;
        this.shareholderList.push(this.newShareholderObj);

        this.newShareholderObj = new Shareholder();
        this.newShareholderObj.id = this.getId();
        this.newShareholderObj.itemCode = 'Share Amount:';
        this.newShareholderObj.itemValue = '';
        this.newShareholderObj.isEdit = true;
        this.shareholderList.push(this.newShareholderObj);

        this.newShareholderObj = new Shareholder();
        this.newShareholderObj.id = this.getId();
        this.newShareholderObj.itemCode = 'Share Percent:';
        this.newShareholderObj.itemValue = '';
        this.newShareholderObj.isEdit = true;
        this.shareholderList.push(this.newShareholderObj);

        this.newShareholderObj = new Shareholder();
        this.newShareholderObj.id = this.getId();
        this.newShareholderObj.itemCode = 'Country:';
        this.newShareholderObj.itemValue = '';
        this.newShareholderObj.isEdit = true;
        this.shareholderList.push(this.newShareholderObj);


    }

    onUpdate(shareholderObj: Shareholder) {
        console.log(shareholderObj);
        shareholderObj.isEdit = false;
    }

    onCancel(shareholderObj: Shareholder) {
        if (this.oldShareholderObj == undefined || this.oldShareholderObj == null) {
            shareholderObj.isEdit = true;
            this.shareholderList.splice(this.shareholderList.findIndex(e => e.id === shareholderObj.id), 1);
        } else {

            shareholderObj.itemCode = this.oldShareholderObj.itemCode;
            shareholderObj.itemValue = this.oldShareholderObj.itemValue;
            shareholderObj.isEdit = false;
        }

    }

    onSave() {
        this.shareholderList.forEach(obj => {
            obj.isEdit = false;
        });
        console.log(this.shareholderList);
    }

    validateField(item: any) {
        if (item !== '') {
            return false;
        } else {
            return true;
        }

    }

    validateForm(shareholderObj: Shareholder) {
        if (shareholderObj.itemCode !== '' && shareholderObj.itemValue !== '') {
            return false;
        } else {
            return true;
        }
    }

    getId() {
        if (this.shareholderList.length == 0) {
            return 1;
        } else {
            let lastShareholderObj: Shareholder = this.shareholderList[this.shareholderList.length - 1];
            return lastShareholderObj.id + 1;
        }
    }

}
