import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompanyInfo } from 'src/app/models/financial-info/company-info.model';
import { Contact } from 'src/app/models/financial-info/contact.model';
import { ContactService } from 'src/app/services/financial-info/contact.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

    contactsForm: UntypedFormGroup;
    contact: Contact;
    isUpdateMode = false;
    companyInfo: CompanyInfo;

    constructor(
        private router: Router,
        private formBuilder: UntypedFormBuilder,
        private loader: NgxSpinnerService,
        private notifyService: NotificationService,
        private utilService: UtilService,
        private sharedService: SharedService,
        private contactService: ContactService
    ) {
        this.companyInfo = new CompanyInfo();
        this.contact = new Contact();
        this.companyInfo = this.sharedService.getCompanyInfoObject();
    }

    ngOnInit(): void {
        
        this.contactsForm = this.formBuilder.group({
            name: new FormControl(""),
            telephoneNo: new FormControl(""),
            faxNo: new FormControl(""),
            email: new FormControl(""),
            website: new FormControl("")
        });

        this.getList();
    }

    getList() {
        this.loader.show();
        this.contactService.getList(this.companyInfo.id).subscribe({
            next: (data) => {
                if (data.data.length > 0) {
                    this.contact = data.data[0];
                    this.isUpdateMode = true;
                }
            },
            complete: () => {                
                this.loader.hide();
            },
            error: (err) => {
                console.log(err);
                this.loader.hide();
            },
        });
    }

    submit() {
        if (!this.contactsForm.valid) {
            this.utilService.validateAllFormFields(this.contactsForm);
            return;
        }

        if (this.contactsForm.valid) {
            this.loader.show();

            this.contact.companyInfo = this.companyInfo;

            this.contactService.create(this.contact).subscribe({
                next: (response) => {
                    console.log(response);
                    this.contact = response.data;
                    this.notifyService.showSuccess("success", response.message);

                    this.router.navigate(["admin/financial-info"]);
                },
                complete: () => {
                    // this.getList();
                    this.isUpdateMode = true;
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

    update() {
        if (!this.contactsForm.valid) {
            this.utilService.validateAllFormFields(this.contactsForm);
            return;
        }

        if (this.contactsForm.valid) {
            this.loader.show();

            this.contactService.update(this.contact).subscribe({
                next: (response) => {
                    console.log(response);
                    this.contact = response.data;
                    this.notifyService.showSuccess("success", response.message);

                    this.router.navigate(["admin/financial-info"]);
                },
                complete: () => {
                    // this.getList();
                    this.isUpdateMode = true;
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

    resetForm() {
        this.contactsForm.reset();
        this.isUpdateMode = false;
    }

}
