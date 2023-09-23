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
    isExcel: boolean = false;
    currencyList: any;
    selectedCurrency: any;
    fSummaryForm: UntypedFormGroup;
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


    onChangeExcelUploadChk(event: any) {
        // if (this.bkashMoneyForm.value.bankAccount == null || this.bkashMoneyForm.value.bankAccount == undefined) {
        //   event.target.checked = false;
        //   this.detailsForm.controls['excelUploadChk'].setValue(false);

        //   this.notifierService.notify('error', 'Please Select a Bank Account !');
        //   this.bkashMoneyForm['controls']['bankAccount'].markAsTouched();
        //   // return;
        // }
        // if (this.detailsForm.value.commission == "" || this.detailsForm.value.commission == undefined) {
        //   event.target.checked = false;
        //   this.detailsForm.controls['excelUploadChk'].setValue(false);

        //   this.notifierService.notify('error', 'Please Enter Commission deduct(%) !');
        //   this.detailsForm['controls']['commission'].markAsTouched();
        //   // return;
        // }

        // this.isExcel = this.detailsForm.value.excelUploadChk;
    }

    downLoadExcelFormat() {
        // this.utilService.downloadExcel('excel-format-of-bkash-money.xlsx');
    }


    onExcelFileUpload(event: any) {
        let fileName = event.target.files[0].name;
        let regex = /(.xlsx|.xls)$/;
        // this.bkashMoneyDetailsList = [];

        // if (regex.test(fileName.toLowerCase())) {
        //   let formData = new FormData();
        //   formData.append('file', event.target.files[0]);
        //   formData.append('fileName', event.target.files[0].name);
        //   formData.append('type', event.target.files[0].type);
        //   formData.append('size', event.target.files[0].size);
        //   formData.append('category', this.bkashMoneyForm.value.category);
        //   formData.append('commission', this.detailsForm.value.commission);
        //   formData.append('particulars', this.detailsForm.value.particulars);

        //   this.loader.show();
        //   this.totalAmount = 0;
        //   if(this.bkashMoneyDetailsList.length > 0) {
        //     this.deletedBkashMoneyDetailsList = this.bkashMoneyDetailsList;
        //   }
        //   this.bkashMoneyDetailsList = [];
        //   this.bkashMoneyService.bkashExcelFileUpload(formData).subscribe({
        //     next: (response) => {
        //       console.log(response);
        //       let bkashMoneyDetailsModels = response.data.responseModels;

        //       for (let i = 0; i < bkashMoneyDetailsModels.length; i += 1) {
        //         let bkashMoneyDetails = {
        //           slNumber: bkashMoneyDetailsModels[i].slNumber,
        //           projectSetup: bkashMoneyDetailsModels[i].projectSetup,
        //           projectSetupId: bkashMoneyDetailsModels[i].projectSetup.id,
        //           areaCurrentAccountCode: bkashMoneyDetailsModels[i].areaCurrentAccCode,
        //           areaCurrentAccCode: bkashMoneyDetailsModels[i].areaCurrentAccCode.areaCurrentAcCode,
        //           amount: bkashMoneyDetailsModels[i].amount,
        //           commission: bkashMoneyDetailsModels[i].commission,
        //           commissionDeduct: this.detailsForm.value.commission,
        //           netAmount: bkashMoneyDetailsModels[i].netAmount,
        //           narration: bkashMoneyDetailsModels[i].narration
        //         };

        //         this.totalAmount += bkashMoneyDetails.netAmount;
        //         this.bkashMoneyDetailsList.push(bkashMoneyDetails);
        //       }

        //       if (response.data.invalidExists == 'true' || response.data.invalidExists == true) {
        //         this.reportName = "areaCodeNotFoundErrorList";
        //         this.requestMap = {
        //           'userId': localStorage.getItem('userId'),
        //           'module': 'BkashMoneyMaster',
        //           'domainErrorName': 'bKash Money Receive'
        //         }
        //         this.reportService.showInvalidAreaReport(this.reportName, this.requestMap);
        //       }
        //     },
        //     complete: () => {
        //       event.target.value = null;
        //       this.totalAmountInWords = this.amountInWordsService.amountToTextWithDecimal(this.totalAmount);
        //       // this.notifierService.notify('success', 'File Loaded Successfuly!');
        //       this.detailsForm.controls['excelUploadChk'].setValue(false);
        //       this.isExcel = this.detailsForm.value.excelUploadChk;
        //       this.selectedRowIndex = -1;
        //       this.loader.hide();
        //     },
        //     error: (err) => {
        //       console.log(err);
        //       this.loader.hide();
        //       event.target.value = null;
        //       this.notifierService.notify('error', err.error?.message);
        //     }
        //   });

        // } else {
        //   // UtilService.hideLoader();
        //   this.notifierService.notify('error', 'Please upload a valid Excel file!');
        //   event.target.value = null;
        //   this.loader.hide();
        // }
    }
}
