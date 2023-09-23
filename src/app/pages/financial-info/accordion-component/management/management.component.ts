import { Component, OnInit } from '@angular/core';
import { Management } from 'src/app/models/financial-info/management.model';

@Component({
    selector: 'app-management',
    templateUrl: './management.component.html',
    styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

    title: string;
    managementList: Management[] = [];
    oldManagementObj: Management;
    newManagementObj: Management;

    constructor() { }

    ngOnInit(): void {
        this.title = 'Management';

        this.getManagementList();
    }


    getManagementList() {
        let managementObj = new Management();
        managementObj.id = this.getId();
        managementObj.itemCode = 'Name'
        managementObj.itemValue = 'Mr. Wickramasinghe Senanayake Appuhamilage Vipul Abayanga Senanayake'
        this.managementList.push(managementObj);

        managementObj = new Management();
        managementObj.id = this.getId();
        managementObj.itemCode = 'Designation:'
        managementObj.itemValue = 'Managing Director'
        this.managementList.push(managementObj);

        managementObj = new Management();
        managementObj.id = this.getId();
        managementObj.itemCode = 'NIC/Passport No.'
        managementObj.itemValue = '692440129 V'
        this.managementList.push(managementObj);

        managementObj = new Management();
        managementObj.id = this.getId();
        managementObj.itemCode = 'Address:'
        managementObj.itemValue = 'No. 45/2, Negombo Road, Bopitiya, Sri Lanka'
        this.managementList.push(managementObj);

        managementObj = new Management();
        managementObj.id = this.getId();
        managementObj.itemCode = 'Nationality:'
        managementObj.itemValue = 'Sri Lankan'
        this.managementList.push(managementObj);
    }

    onEdit(managementObj: Management) {
        this.oldManagementObj = managementObj;
        this.managementList.forEach(obj => {
            obj.isEdit = false;
        });
        managementObj.isEdit = true;

    }

    onDelete(managementObj: Management) {
        this.managementList.splice(this.managementList.findIndex(e => e.itemCode === managementObj.itemCode), 1);
    }

    onAdd() {
        this.oldManagementObj = null;

        this.newManagementObj = new Management();
        this.newManagementObj.id = this.getId();
        this.newManagementObj.itemCode = 'Name';
        this.newManagementObj.itemValue = '';
        this.newManagementObj.isEdit = true;
        this.managementList.push(this.newManagementObj);

        this.newManagementObj = new Management();
        this.newManagementObj.id = this.getId();
        this.newManagementObj.itemCode = 'Designation:'
        this.newManagementObj.itemValue = ''
        this.newManagementObj.isEdit = true;
        this.managementList.push(this.newManagementObj);

        this.newManagementObj = new Management();
        this.newManagementObj.id = this.getId();
        this.newManagementObj.itemCode = 'NIC/Passport No.'
        this.newManagementObj.itemValue = ''
        this.newManagementObj.isEdit = true;
        this.managementList.push(this.newManagementObj);

        this.newManagementObj = new Management();
        this.newManagementObj.id = this.getId();
        this.newManagementObj.itemCode = 'Address:'
        this.newManagementObj.itemValue = ''
        this.newManagementObj.isEdit = true;
        this.managementList.push(this.newManagementObj);

        this.newManagementObj = new Management();
        this.newManagementObj.id = this.getId();
        this.newManagementObj.itemCode = 'Nationality:'
        this.newManagementObj.itemValue = ''
        this.newManagementObj.isEdit = true;
        this.managementList.push(this.newManagementObj);
    }

    onUpdate(managementObj: Management) {
        console.log(managementObj);
        managementObj.isEdit = false;
    }

    onCancel(managementObj: Management) {
        if (this.oldManagementObj == undefined || this.oldManagementObj == null) {
            managementObj.isEdit = true;
            this.managementList.splice(this.managementList.findIndex(e => e.itemCode === managementObj.itemCode), 1);
        } else {

            managementObj.itemCode = this.oldManagementObj.itemCode;
            managementObj.itemValue = this.oldManagementObj.itemValue;
            managementObj.isEdit = false;
        }

    }

    onSave() {
        this.managementList.forEach(obj => {
            obj.isEdit = false;
        });
        console.log(this.managementList);
    }

    validateField(item: any) {
        if (item !== '') {
            return false;
        } else {
            return true;
        }

    }

    validateForm(managementObj: Management) {
        if (managementObj.itemCode !== '' && managementObj.itemValue !== '') {
            return false;
        } else {
            return true;
        }
    }

    getId() {
        if (this.managementList.length == 0) {
            return 1;
        } else {
            let lastmanagementObj: Management = this.managementList[this.managementList.length - 1];
            return lastmanagementObj.id + 1;
        }
    }

}
