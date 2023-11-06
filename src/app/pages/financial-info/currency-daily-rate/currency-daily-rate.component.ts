import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter } from 'rxjs';
import { CurrencyDailyRate } from 'src/app/models/financial-info/currency-daily-rate.model';
import { CountryService } from 'src/app/services/financial-info/country.service';
import { CurrencyDailyRateService } from 'src/app/services/financial-info/currency-daily-rate.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
    selector: 'app-currency-daily-rate',
    templateUrl: './currency-daily-rate.component.html',
    styleUrls: ['./currency-daily-rate.component.scss']
})



export class CurrencyDailyRateComponent implements OnInit {

    title: string;
    currencyDailyRateList: CurrencyDailyRate[] = [];
    currencyDailyRateListAll: CurrencyDailyRate[] = [];
    oldCurrencyDailyRateObj: CurrencyDailyRate;
    currencyDailyRateNewObj: CurrencyDailyRate;
    countryId: number;
    currencyDate: Date;

    currencyList: any[] = [];
    selectedCurrency: any;

    countryList: any[] = [];

    private today = new Date();
    public maxDate = { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() };

    constructor(
        private router: Router,
        private loader: NgxSpinnerService,
        private notifyService: NotificationService,
        private utilService: UtilService,
        private currencyDailyRateService: CurrencyDailyRateService,
        private countryService: CountryService
    ) {
        this.currencyDate = new Date();
    }

    ngOnInit(): void {
        // this.getCurrencyDailyRateListByDate(this.currencyDate);
        this.getCurrencyDailyRateList();
        this.getCountryList();
    }

    getCurrencyDailyRateList() {
        this.loader.show();
        this.currencyDailyRateService.getList().subscribe({
            next: (data) => {
                this.currencyDailyRateListAll = data.data;
            },
            complete: () => {
                this.getCurrencyDailyRateListByDate();
                this.loader.hide();
            },
            error: (err) => {
                console.log(err);
                this.loader.hide();
            },
        });
    }

    getCurrencyDailyRateListByDate() {

        console.log(this.currencyDate);

        this.currencyDailyRateList = this.currencyDailyRateListAll.filter(item =>
            this.utilService.dateFormat(item.currencyDate, 'yyyy-MM-dd') == this.utilService.dateFormat(this.currencyDate, 'yyyy-MM-dd'));
    }

    getCountryList() {
        this.countryService.getList().subscribe({
            next: (data) => {
                this.countryList = data.data;
            },
            complete: () => {
                this.countryList.forEach(country => {
                    this.currencyList.push({ code: country.name + ' - ' + country.currencyName + ' (' + country.currency + ')', country: country.name, countryId: country.id })
                });
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    getCurrencyList() {
        this.currencyList;
    }

    loadCurrencyList() {
        this.getCurrencyList();
    }

    onCurrencyChange(currencyCode: string, currencyDailyRateObj: CurrencyDailyRate) {
        this.selectedCurrency = this.currencyList.find((currency) => currency.code === currencyCode) || null;
        currencyDailyRateObj.countryId = this.selectedCurrency.countryId;
    }

    onCurrencyScrollToEnd() {
        this.loadCurrencyList();
    }

    onEdit(currencyDailyRateObj: CurrencyDailyRate) {
        this.oldCurrencyDailyRateObj = currencyDailyRateObj;
        this.currencyDailyRateList.forEach(obj => {
            obj.isEdit = false;
        });
        currencyDailyRateObj.isEdit = true;

        if (currencyDailyRateObj?.currency != "") {
            console.log(currencyDailyRateObj.currency);
            // this.currencyCode=financialSummaryObj.currency
            this.onCurrencyChange(currencyDailyRateObj.currency, null);
        }

    }

    onDelete(currencyDailyRate: CurrencyDailyRate) {
        this.currencyDailyRateList.splice(this.currencyDailyRateList.findIndex(e => e.currency === currencyDailyRate.currency), 1);
    }

    onAdd() {
        this.oldCurrencyDailyRateObj = null;

        this.currencyDailyRateNewObj = new CurrencyDailyRate();
        this.currencyDailyRateNewObj.countryId = null;
        this.currencyDailyRateNewObj.currency = '';
        this.currencyDailyRateNewObj.currencyRate = 0;
        this.currencyDailyRateNewObj.currencyDate = null;
        this.currencyDailyRateNewObj.unit = 1;
        this.currencyDailyRateNewObj.isEdit = true;

        this.currencyDailyRateList.push(this.currencyDailyRateNewObj);
    }

    onUpdate(currencyDailyRate: CurrencyDailyRate) {
        console.log(currencyDailyRate);
        currencyDailyRate.isEdit = false;
    }

    onCancel(currencyDailyRate: CurrencyDailyRate) {
        if (this.oldCurrencyDailyRateObj == undefined || this.oldCurrencyDailyRateObj == null) {
            currencyDailyRate.isEdit = true;
            this.currencyDailyRateList.splice(this.currencyDailyRateList.findIndex(e => e.currency === currencyDailyRate.currency), 1);
        } else {

            currencyDailyRate.currency = this.oldCurrencyDailyRateObj.currency;
            currencyDailyRate.currencyRate = this.oldCurrencyDailyRateObj.currencyRate;
            currencyDailyRate.unit = this.oldCurrencyDailyRateObj.unit;
            currencyDailyRate.isEdit = false;
        }

    }

    onSelectRow(currencyDailyRate: CurrencyDailyRate) {
        this.currencyDate = new Date(currencyDailyRate.currencyDate);
        this.getCurrencyDailyRateListByDate();
    }

    onSave() {
        let currencydate = this.utilService.dateFormat(this.currencyDate, 'yyyy-MM-dd');
        this.currencyDailyRateList.forEach(obj => {
            obj.currencyDate = currencydate;
        });
        console.log(this.currencyDailyRateList);

        if (this.currencyDailyRateList.length > 0) {
            this.loader.show();

            this.currencyDailyRateService.save(this.currencyDailyRateList, this.currencyDate).subscribe({
                next: (response) => {
                    console.log(response);
                    this.notifyService.showSuccess("success", response.message);

                    this.router.navigate(["admin/currency-daily-rate"]);
                },
                complete: () => {
                    this.getCurrencyDailyRateList();
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

    validateField(item: any) {
        if (item !== '') {
            return false;
        } else {
            return true;
        }

    }

    validateForm(currencyDailyRate: CurrencyDailyRate) {
        if (currencyDailyRate.currency !== '') {
            return false;
        } else {
            return true;
        }
    }


    getId() {
        if (this.currencyDailyRateList.length == 0) {
            return 1;
        } else {
            let lastCurrencyDailyRateObj: CurrencyDailyRate = this.currencyDailyRateList[this.currencyDailyRateList.length - 1];
            return lastCurrencyDailyRateObj.id + 1;
        }
    }





}
