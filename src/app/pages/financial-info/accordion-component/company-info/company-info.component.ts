import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompanyInfo } from 'src/app/models/financial-info/company-info.model';
import { ConfirmationModalService } from 'src/app/services/confirmation-modal/confirmation-modal.service';
import { CompanyInfoService } from 'src/app/services/financial-info/company-info.service';
import { CountryService } from 'src/app/services/financial-info/country.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
    selector: 'app-company-info',
    templateUrl: './company-info.component.html',
    styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent implements OnInit {

    title: string;
    isUpdateMode = false;
    companyInfo: CompanyInfo;
    companyInfoForm: UntypedFormGroup;
    companyId: number;
    countryList: any[] = [];
    selectedCountry: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: UntypedFormBuilder,
        private confirmationModalService: ConfirmationModalService,
        private loader: NgxSpinnerService,
        private notifyService: NotificationService,
        private utilService: UtilService,
        private companyInfoService: CompanyInfoService,
        private sharedService: SharedService,
        private countryService: CountryService
    ) {

        this.companyInfo = new CompanyInfo();

        this.route.queryParams.subscribe((params: any) => {
            this.companyInfo = JSON.parse(params.data);
            if (this.companyInfo != null) {
                this.isUpdateMode = true;
                this.onCountryChange(this.companyInfo.country);
            }
        })

        // this.sharedService.setCompanyInfoObject(this.companyInfo);
        this.sharedService.updateData(this.companyInfo);
    }

    ngOnInit(): void {
        this.getCountryList();

        this.companyInfoForm = this.formBuilder.group({
            name: new FormControl("", Validators.required),
            legalAddress: new FormControl(""),
            operationAddress: new FormControl(""),
            telephoneNumber: new FormControl(""),
            website: new FormControl(""),
            industryType: new FormControl(""),
            yearEstablished: new FormControl(""),
            ageOfBusiness: new FormControl(""),
            businessType: new FormControl(""),
            country: new FormControl(""),
            businessScale: new FormControl(""),
            paymentPractices: new FormControl(""),
            listedStatus: new FormControl(""),
            status: ["Active"],
            numberOfDirector: new FormControl(""),
            numberOfShareholders: new FormControl(""),
            numberOfEmployee: new FormControl(""),
            numberOfSubsidiaries: new FormControl(""),
            holdingCompany: new FormControl(""),
            affiliatedCompanies: new FormControl(""),
            legalStatus: new FormControl(""),
            noOfCharge: new FormControl(""),
            noOfJudicialRecord: new FormControl(""),
            maximumCredit: new FormControl(""),
            creditRating: new FormControl(""),
            clientName: new FormControl(""),
            clientRefNo: new FormControl(""),
            infixRefNo: new FormControl(""),
            serviceType: new FormControl(""),
            inquiryDate: new FormControl(''),
            productName: new FormControl(''),
            dueDate: [],
            deliveryDate: [],
            reportDate: [],
            isEdit: false
        });

        this.companyInfoForm.controls['inquiryDate'].setValue(this.utilService.dateFormat(this.companyInfo.inquiryDate, 'dd-MM-yyyy'));
        this.companyInfoForm.controls['dueDate'].setValue(this.utilService.dateFormat(this.companyInfo.dueDate, 'dd-MM-yyyy'));
        this.companyInfoForm.controls['deliveryDate'].setValue(this.utilService.dateFormat(this.companyInfo.deliveryDate, 'dd-MM-yyyy'));
        this.companyInfoForm.controls['reportDate'].setValue(this.utilService.dateFormat(this.companyInfo.reportDate, 'dd-MM-yyyy'));

    }

    submit() {
        if (!this.companyInfoForm.valid) {
            this.utilService.validateAllFormFields(this.companyInfoForm);
            return;
        }

        this.companyInfo.inquiryDate = this.utilService.dateFormat(this.companyInfoForm.value.inquiryDate, 'yyyy-MM-dd');
        this.companyInfo.dueDate = this.utilService.dateFormat(this.companyInfoForm.value.dueDate, 'yyyy-MM-dd');
        this.companyInfo.deliveryDate = this.utilService.dateFormat(this.companyInfoForm.value.deliveryDate, 'yyyy-MM-dd');
        this.companyInfo.reportDate = this.utilService.dateFormat(this.companyInfoForm.value.reportDate, 'yyyy-MM-dd');

        if (this.companyInfoForm.valid) {
            this.loader.show();

            this.companyInfoService.create(this.companyInfo).subscribe({
                next: (response) => {
                    console.log(response);
                    this.companyInfo = response.data;
                    // this.sharedService.setCompanyInfoObject(this.companyInfo);
                    this.sharedService.updateData(this.companyInfo);
                    this.notifyService.showSuccess("success", response.message);

                    this.router.navigate(["admin/financial-info"]);
                },
                complete: () => {
                    this.loader.hide();
                    // this.resetForm();
                    this.isUpdateMode = true;
                },
                error: (err) => {
                    console.log(err);
                    this.notifyService.showError("error", err.error?.message);
                    this.loader.hide();
                },
            });
        }
    }

    update() {
        if (!this.companyInfoForm.valid) {
            this.utilService.validateAllFormFields(this.companyInfoForm);
            return;
        }

        this.companyInfo.inquiryDate = this.utilService.dateFormat(this.companyInfoForm.value.inquiryDate, 'yyyy-MM-dd');
        this.companyInfo.dueDate = this.utilService.dateFormat(this.companyInfoForm.value.dueDate, 'yyyy-MM-dd');
        this.companyInfo.deliveryDate = this.utilService.dateFormat(this.companyInfoForm.value.deliveryDate, 'yyyy-MM-dd');
        this.companyInfo.reportDate = this.utilService.dateFormat(this.companyInfoForm.value.reportDate, 'yyyy-MM-dd');

        if (this.companyInfoForm.valid) {
            this.loader.show();

            this.companyInfoService.update(this.companyInfo).subscribe({
                next: (response) => {
                    console.log(response);
                    this.companyInfo = response.data;
                    // this.sharedService.setCompanyInfoObject(this.companyInfo);
                    this.sharedService.updateData(this.companyInfo);
                    this.notifyService.showSuccess("success", response.message);

                    this.router.navigate(["admin/financial-info"]);
                },
                complete: () => {
                    this.loader.hide();
                    this.isUpdateMode = true;
                },
                error: (err) => {
                    console.log(err);
                    this.notifyService.showError("error", err.error?.message);
                    this.loader.hide();
                },
            });
        }
    }

    resetForm() {
        this.companyInfoForm.reset();
        this.isUpdateMode = false;
    }

    getCountryList() {
        let data = {};
        this.countryService.getList().subscribe({
            next: (data) => {
                this.countryList = data.data;
            },
            complete: () => { },
            error: (err) => {
                console.log(err);
            },
        });
    }

    loadCountryList() {
        this.countryList;
    }


    onCountryChange(name: string) {
        this.selectedCountry = this.countryList.find((country) => country.name === name) || null;

        this.companyInfo.country = this.selectedCountry.name;
        this.companyInfo.currency = this.selectedCountry.currency;
    }

    onScrollToEnd() {
        this.loadCountryList();
    }

}
