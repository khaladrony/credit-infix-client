import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompanyInfo } from 'src/app/models/financial-info/company-info.model';
import { ConfirmationModalService } from 'src/app/services/confirmation-modal/confirmation-modal.service';
import { CompanyInfoService } from 'src/app/services/financial-info/company-info.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
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

    constructor(
        private router: Router,
        private formBuilder: UntypedFormBuilder,
        private confirmationModalService: ConfirmationModalService,
        private loader: NgxSpinnerService,
        private notifyService: NotificationService,
        private utilService: UtilService,
        private companyInfoService: CompanyInfoService
    ) {
        this.companyInfo = new CompanyInfo();
    }

    ngOnInit(): void {
        this.companyInfoForm = this.formBuilder.group({
            name: new FormControl("", Validators.required),
            legalAddress: new FormControl(""),
            operationAddress: new FormControl(""),
            telephoneNumber: new FormControl(""),
            website: new FormControl(""),
            faxNo: new FormControl(""),
            email: new FormControl(""),
            industryType: new FormControl(""),
            yearEstablished: new FormControl(""),
            ageOfBusiness: new FormControl(""),
            businessType: new FormControl(""),
            country: new FormControl(""),
            state: new FormControl(""),
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
            isEdit: false
        });
    }

    submit() {
        if (!this.companyInfoForm.valid) {
            this.utilService.validateAllFormFields(this.companyInfoForm);
            return;
        }

        if (this.companyInfoForm.valid) {
            this.loader.show();

            this.companyInfoService.create(this.companyInfo).subscribe({
                next: (response) => {
                    console.log(response);
                    this.notifyService.showSuccess("success", response.message);

                    this.router.navigate(["admin/financial-info"]);
                },
                complete: () => {
                    this.loader.hide();
                    this.resetForm();
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
    //     this.user.id = this.userProfileForm.value.userId;
    //     this.user.username = this.userProfileForm.value.username;
    //     this.user.password = this.userProfileForm.value.password;
    //     this.user.email = this.userProfileForm.value.email;
    //     this.user.address = this.userProfileForm.value.address;
    //     this.user.phoneNo = this.userProfileForm.value.phoneNo;
    //     this.user.status = this.userProfileForm.value.status;
    //     this.user.role = this.selectedRole;

    //     if (this.userProfileForm.valid) {
    //         this.loader.show();

    //         this.userService.update(this.user).subscribe({
    //             next: (response) => {
    //                 console.log(response);
    //                 this.notifyService.showSuccess("success", response.message);

    //                 this.router.navigate(["admin/user-profile"]);
    //             },
    //             complete: () => {
    //                 this.loader.hide();
    //                 this.resetForm();
    //             },
    //             error: (err) => {
    //                 console.log(err);
    //                 this.notifyService.showError("error", err.error?.message);
    //                 this.loader.hide();
    //             },
    //         });
    //     }
    }

    delete(){

    }

    resetForm() {
        this.companyInfoForm.reset();
    }

}
