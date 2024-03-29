import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompanyInfo } from 'src/app/models/financial-info/company-info.model';
import { FinancialSummary } from 'src/app/models/financial-info/financial-summary.model';
import { ConfirmationModalService } from 'src/app/services/confirmation-modal/confirmation-modal.service';
import { FinancialSummaryService } from 'src/app/services/financial-info/financial-summary.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { StoredProcedureExecuteService } from 'src/app/services/stored-procedure-execute.service';

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
    currencyCode: string;
    comments: string;
    companyInfo: CompanyInfo;
    templateBtnShow: boolean = false;
    isUpdateMode: boolean = false;
    btnLabel: string = 'Save';

    constructor(
        private router: Router,
        private loader: NgxSpinnerService,
        private notifyService: NotificationService,
        private sharedService: SharedService,
        private financialSummaryService: FinancialSummaryService,
        private storedProcedureExecuteService: StoredProcedureExecuteService,
        private confirmationModalService: ConfirmationModalService
    ) {
        this.companyInfo = new CompanyInfo();
    }

    ngOnInit(): void {
        this.title = 'Financial Summary';
        // this.companyInfo = this.sharedService.getCompanyInfoObject();

        // Subscribe to changes in the data
        this.sharedService.data$.subscribe((companyInfo) => {
            this.companyInfo = companyInfo;

            this.getFinancialSummaryList();
            this.getCurrencyList();
        });


    }

    getFinancialSummaryList() {
        this.loader.show();
        this.financialSummaryService.getList(this.companyInfo.id).subscribe({
            next: (data) => {
                this.financialSummaryList = data.data;
            },
            complete: () => {
                this.financialSummaryList.forEach(obj => {
                    obj.isEdit = false;
                    this.comments = obj.comments;
                });

                this.saveAndUpdateBtnChange();
                this.templateButtonActivate();

                this.loader.hide();
            },
            error: (err) => {
                console.log(err);
                this.loader.hide();
            },
        });
    }

    saveAndUpdateBtnChange() {
        this.isUpdateMode = true;
        this.btnLabel = 'Update';
    }

    templateButtonActivate() {
        if (this.financialSummaryList.length == 0
            && this.companyInfo.id > 0) {
            this.templateBtnShow = true;
        }
    }

    addTemplate() {
        let templateName = 'financial_summary';
        this.storedProcedureExecuteService.execute(templateName, this.companyInfo.id).subscribe({
            next: (response) => {
                console.log(response);
                this.notifyService.showSuccess("success", response.message);

                this.router.navigate(["admin/financial-info"]);
            },
            complete: () => {
                this.getFinancialSummaryList();
                this.loader.hide();
            },
            error: (err) => {
                console.log(err);
                this.notifyService.showError("error", err.error?.message);
                this.loader.hide();
            },
        });
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

    // onDelete(financialSummary: FinancialSummary) {
    //     this.financialSummaryList.splice(this.financialSummaryList.findIndex(e => e.itemCode === financialSummary.itemCode), 1);
    // }

    onAdd() {
        this.oldFinancialSummaryObj = null;

        this.financialSummaryNewObj = new FinancialSummary();
        this.financialSummaryNewObj.itemCode = '';
        this.financialSummaryNewObj.currency = '';
        this.financialSummaryNewObj.amount = '';
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
            this.financialSummaryList.splice(this.financialSummaryList.findIndex(e => e.itemCode === financialSummary.itemCode), 1);
        } else {

            financialSummary.itemCode = this.oldFinancialSummaryObj.itemCode;
            financialSummary.currency = this.oldFinancialSummaryObj.currency;
            financialSummary.amount = this.oldFinancialSummaryObj.amount;
            financialSummary.isEdit = false;
        }

    }

    onSave() {
        this.financialSummaryList.forEach(obj => {
            obj.comments = this.comments;
            obj.companyInfo = this.companyInfo;
        });
        console.log(this.financialSummaryList);

        if (this.financialSummaryList.length > 0) {
            this.loader.show();

            this.financialSummaryService.save(this.financialSummaryList, this.companyInfo.id, this.btnLabel).subscribe({
                next: (response) => {
                    console.log(response);
                    this.notifyService.showSuccess("success", response.message);

                    this.router.navigate(["admin/financial-info"]);
                },
                complete: () => {
                    this.getFinancialSummaryList();
                    this.loader.hide();
                },
                error: (err) => {
                    console.log(err);
                    this.notifyService.showError("error", err.error?.message);
                    this.loader.hide();
                },
            });
        }
    }

    onDelete(id: any) {
        this.confirmationModalService
            .confirm("Delete confirmation!", "Are you sure you want to delete?")
            .subscribe((answer) => {
                if (answer === "yes") {
                    this.financialSummaryService.delete(id).subscribe({
                        next: () => {
                            this.notifyService.showSuccess(
                                "success",
                                "Deleted Successfully."
                            );

                            this.router.navigate(["admin/financial-info"]);
                        },
                        complete: () => {
                            this.getFinancialSummaryList();
                            this.loader.hide();
                        },
                        error: (err) => {
                            this.notifyService.showError("error", err.message);
                            console.log(err);
                        },
                    });
                } else {
                    return;
                }
            });
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
