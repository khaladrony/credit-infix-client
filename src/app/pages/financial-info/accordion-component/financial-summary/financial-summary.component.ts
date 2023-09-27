import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { FinancialSummary } from 'src/app/models/financial-info/financial-summary.model';

@Component({
    selector: 'app-financial-summary',
    templateUrl: './financial-summary.component.html',
    styleUrls: ['./financial-summary.component.scss']
})
export class FinancialSummaryComponent implements OnInit {

    title: string;
    financialSummaryList: FinancialSummary[] = [];
    oldFinancialSummaryObj: FinancialSummary;
    financialSummaryNewObj: FinancialSummary;
    currencyList: any;
    selectedCurrency: any;
    // fSummaryForm: UntypedFormGroup;
    currencyCode:string;

    constructor() { }

    ngOnInit(): void {        
        this.title = 'Financial Summary';
        this.getFinancialSummaryList();
        this.getCurrencyList();
    }

    getFinancialSummaryList() {
        let financialSummaryObj = new FinancialSummary();
        financialSummaryObj.id = this.getId();
        financialSummaryObj.itemCode = 'Authorized Capital';
        financialSummaryObj.currency = '';
        financialSummaryObj.amount = 0;
        financialSummaryObj.isEdit = true;
        this.financialSummaryList.push(financialSummaryObj);

        financialSummaryObj = new FinancialSummary();
        financialSummaryObj.id = this.getId();
        financialSummaryObj.itemCode = 'Paid Up Capital';
        financialSummaryObj.currency = '';
        financialSummaryObj.amount = 0;
        financialSummaryObj.isEdit = true;
        this.financialSummaryList.push(financialSummaryObj);

        financialSummaryObj = new FinancialSummary();
        financialSummaryObj.id = this.getId();
        financialSummaryObj.itemCode = 'Each Share Value';
        financialSummaryObj.currency = '';
        financialSummaryObj.amount = 0;
        financialSummaryObj.isEdit = true;
        this.financialSummaryList.push(financialSummaryObj);

        this.financialSummaryList;
    }

    getCurrencyList() {
        this.currencyList = [
            { code: 'BDT', country: 'Bangladesh' },
            { code: 'USD', country: 'USA Dollar' },
            { code: 'CNY', country: 'China' },
            { code: 'INR', country: 'India Rupee' },
            { code: 'LKR', country: 'Sri Lanka Rupee' }
        ]

    }

    loadCurrencyList() {
        this.getCurrencyList();
    }

    onCurrencyChange(currencyCode: string) {
        this.selectedCurrency = this.currencyList.find((currency) => currency.code === currencyCode) || null;
        console.log(this.selectedCurrency);
    }

    onCurrencyScrollToEnd() {
        this.loadCurrencyList();
    }

    onEdit(financialSummaryObj: FinancialSummary) {
        this.oldFinancialSummaryObj = financialSummaryObj;
        this.financialSummaryList.forEach(obj => {
            obj.isEdit = false;
        });
        financialSummaryObj.isEdit = true;
        
        if (financialSummaryObj?.currency != "") {
            console.log(financialSummaryObj.currency);
            // this.currencyCode=financialSummaryObj.currency
            this.onCurrencyChange(financialSummaryObj.currency);
        }

    }

    onDelete(financialSummary: FinancialSummary) {
        this.financialSummaryList.splice(this.financialSummaryList.findIndex(e => e.itemCode === financialSummary.itemCode),1);
    }

    onAdd() {
        this.oldFinancialSummaryObj = null;

        this.financialSummaryNewObj = new FinancialSummary();
        this.financialSummaryNewObj.itemCode = '';
        this.financialSummaryNewObj.currency = '';
        this.financialSummaryNewObj.amount = 0;
        this.financialSummaryNewObj.isEdit = true;

        this.financialSummaryList.push(this.financialSummaryNewObj);
    }

    onUpdate(financialSummary: FinancialSummary) {
        console.log(financialSummary);
        financialSummary.isEdit = false;
    }

    onCancel(financialSummary: FinancialSummary) {
        if (this.oldFinancialSummaryObj == undefined || this.oldFinancialSummaryObj == null) {
            financialSummary.isEdit = true;
            this.financialSummaryList.splice(this.financialSummaryList.findIndex(e => e.itemCode === financialSummary.itemCode),1);
        } else {

            financialSummary.itemCode = this.oldFinancialSummaryObj.itemCode;
            financialSummary.currency = this.oldFinancialSummaryObj.currency;
            financialSummary.amount = this.oldFinancialSummaryObj.amount;
            financialSummary.isEdit = false;
        }

    }

    onSave() {
        this.financialSummaryList.forEach(obj => {
            obj.isEdit = false;
        });
        console.log(this.financialSummaryList);
    }

    validateField(item: any) {
        if (item !== '') {
            return false;
        } else {
            return true;
        }

    }

    validateForm(financialSummary: FinancialSummary) {
        if (financialSummary.itemCode !== '' && this.selectedCurrency !== '') {
            return false;
        } else {
            return true;
        }
    }


    getId() {
        if (this.financialSummaryList.length == 0) {
            return 1;
        } else {
            let lastFinancialSummaryObj: FinancialSummary = this.financialSummaryList[this.financialSummaryList.length - 1];
            return lastFinancialSummaryObj.id + 1;
        }
    }

}
