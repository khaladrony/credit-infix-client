import { Component, OnInit } from '@angular/core';
import { FinancialInformation } from 'src/app/models/financial-info/financial-information.model';

@Component({
    selector: 'app-financial-information',
    templateUrl: './financial-information.component.html',
    styleUrls: ['./financial-information.component.scss']
})
export class FinancialInformationComponent implements OnInit {

    title: string;
    firstRowData: string;
    financialInformationList: FinancialInformation[] = [];
    oldFinancialInformationObj: FinancialInformation;
    newFinancialInformationObj: FinancialInformation;

    constructor() { }

    ngOnInit(): void {
        this.title = 'Financial Information';

        this.firstRowData='Figure in LKR - Million';

        this.getFinancialInformationList();
    }


    getFinancialInformationList() {
        let financialInformationObj = new FinancialInformation();
        financialInformationObj.id = this.getId();
        financialInformationObj.itemCode = 'Year';
        financialInformationObj.currentYear = '2022';
        financialInformationObj.middleYear = '2021';
        financialInformationObj.firstYear = '2020';
        this.financialInformationList.push(financialInformationObj);

        financialInformationObj = new FinancialInformation();
        financialInformationObj.id = this.getId();
        financialInformationObj.itemCode = 'Turnover';
        financialInformationObj.currentYear = '3325.17';
        financialInformationObj.middleYear = '3291.42';
        financialInformationObj.firstYear = '3259.85';
        this.financialInformationList.push(financialInformationObj);

        financialInformationObj = new FinancialInformation();
        financialInformationObj.id = this.getId();
        financialInformationObj.itemCode = 'Profit/(Loss)';
        financialInformationObj.currentYear = '89.90';
        financialInformationObj.middleYear = '81.53';
        financialInformationObj.firstYear = '73.82';
        this.financialInformationList.push(financialInformationObj);

        financialInformationObj = new FinancialInformation();
        financialInformationObj.id = this.getId();
        financialInformationObj.itemCode = 'Liability';
        financialInformationObj.currentYear = '2187.00';
        financialInformationObj.middleYear = '2194.76';
        financialInformationObj.firstYear = '2170.11';
        this.financialInformationList.push(financialInformationObj);

        financialInformationObj = new FinancialInformation();
        financialInformationObj.id = this.getId();
        financialInformationObj.itemCode = 'Assets';
        financialInformationObj.currentYear = '2280.29';
        financialInformationObj.middleYear = '2265.10';
        financialInformationObj.firstYear = '2258.30';
        this.financialInformationList.push(financialInformationObj);

        
    }

    onEdit(financialInformationObj: FinancialInformation) {
        this.oldFinancialInformationObj = financialInformationObj;
        this.financialInformationList.forEach(obj => {
            obj.isEdit = false;
        });
        financialInformationObj.isEdit = true;

    }

    onDelete(financialInformationObj: FinancialInformation) {
        this.financialInformationList.splice(this.financialInformationList.findIndex(e => e.id === financialInformationObj.id), 1);
    }

    onAdd() {
        this.oldFinancialInformationObj = null;

        this.newFinancialInformationObj = new FinancialInformation();
        this.newFinancialInformationObj.id = this.getId();
        this.newFinancialInformationObj.itemCode = '';
        this.newFinancialInformationObj.currentYear = '';
        this.newFinancialInformationObj.middleYear = '';
        this.newFinancialInformationObj.firstYear = '';
        this.newFinancialInformationObj.isEdit = true;
        this.financialInformationList.push(this.newFinancialInformationObj);



    }

    onUpdate(financialInformationObj: FinancialInformation) {
        console.log(financialInformationObj);
        financialInformationObj.isEdit = false;
    }

    onCancel(financialInformationObj: FinancialInformation) {
        if (this.oldFinancialInformationObj == undefined || this.oldFinancialInformationObj == null) {
            financialInformationObj.isEdit = true;
            this.financialInformationList.splice(this.financialInformationList.findIndex(e => e.id === financialInformationObj.id), 1);
        } else {

            financialInformationObj.itemCode = this.oldFinancialInformationObj.itemCode;
            financialInformationObj.currentYear = this.oldFinancialInformationObj.currentYear;
            financialInformationObj.middleYear = this.oldFinancialInformationObj.middleYear;
            financialInformationObj.firstYear = this.oldFinancialInformationObj.firstYear;
            financialInformationObj.isEdit = false;
        }

    }

    onSave() {
        this.financialInformationList.forEach(obj => {
            obj.isEdit = false;
        });
        console.log(this.financialInformationList);
    }

    validateField(item: any) {
        if (item !== '') {
            return false;
        } else {
            return true;
        }

    }

    validateForm(financialInformationObj: FinancialInformation) {
        if (financialInformationObj.itemCode !== '') {
            return false;
        } else {
            return true;
        }
    }

    getId() {
        if (this.financialInformationList.length == 0) {
            return 1;
        } else {
            let lastFinancialInformationObj: FinancialInformation = this.financialInformationList[this.financialInformationList.length - 1];
            return lastFinancialInformationObj.id + 1;
        }
    }

}
