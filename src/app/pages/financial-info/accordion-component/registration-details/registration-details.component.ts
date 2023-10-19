import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompanyInfo } from 'src/app/models/financial-info/company-info.model';
import { RegistrationDetail } from 'src/app/models/financial-info/registration-detail.model';
import { RegistrationDetailService } from 'src/app/services/financial-info/registration-detail.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
    selector: 'app-registration-details',
    templateUrl: './registration-details.component.html',
    styleUrls: ['./registration-details.component.scss']
})
export class RegistrationDetailsComponent implements OnInit {

    title: string;
    registrationDetailList: RegistrationDetail[] = [];
    oldRegistrationDetailObj: RegistrationDetail;
    newRegistrationDetailObj: RegistrationDetail;
    companyInfo: CompanyInfo;

    constructor(
        private router: Router,
        private loader: NgxSpinnerService,
        private notifyService: NotificationService,
        private sharedService: SharedService,
        private registrationDetailService: RegistrationDetailService
    ) {
        this.companyInfo = new CompanyInfo();
    }

    ngOnInit(): void {
        this.title = 'Registration Details';

        this.companyInfo = this.sharedService.getCompanyInfoObject();
        this.getList();
    }

    getList() {
        // let registrationDetailObj = new RegistrationDetail();
        // registrationDetailObj.id = this.getId();
        // registrationDetailObj.item = 'Registration Information :';
        // registrationDetailObj.subItem = 'Registration Date';
        // registrationDetailObj.itemValue = '31st March 2017';
        // registrationDetailObj.isRowSpan = false;
        // this.registrationDetailList.push(registrationDetailObj);

        // registrationDetailObj = new RegistrationDetail();
        // registrationDetailObj.id = this.getId();
        // registrationDetailObj.item = 'Registration Information :';
        // registrationDetailObj.subItem = 'Company Registration No';
        // registrationDetailObj.itemValue = 'AAD44882';
        // registrationDetailObj.isRowSpan = true;
        // this.registrationDetailList.push(registrationDetailObj);

        // registrationDetailObj = new RegistrationDetail();
        // registrationDetailObj.id = this.getId();
        // registrationDetailObj.item = 'Registration Information :';
        // registrationDetailObj.subItem = 'Business Identification No(BIN)';
        // registrationDetailObj.itemValue = 'NA';
        // registrationDetailObj.isRowSpan = true;
        // this.registrationDetailList.push(registrationDetailObj);

        // registrationDetailObj = new RegistrationDetail();
        // registrationDetailObj.id = this.getId();
        // registrationDetailObj.item = 'Registration Information :';
        // registrationDetailObj.subItem = 'Import Registration Certificate No (IRC):';
        // registrationDetailObj.itemValue = 'NA';
        // registrationDetailObj.isRowSpan = true;
        // this.registrationDetailList.push(registrationDetailObj);

        // registrationDetailObj = new RegistrationDetail();
        // registrationDetailObj.id = this.getId();
        // registrationDetailObj.item = 'Registration Information :';
        // registrationDetailObj.subItem = 'Tax Identification No (TIN):';
        // registrationDetailObj.itemValue = 'NA';
        // registrationDetailObj.isRowSpan = true;
        // this.registrationDetailList.push(registrationDetailObj);

        // registrationDetailObj = new RegistrationDetail();
        // registrationDetailObj.id = this.getId();
        // registrationDetailObj.item = 'Registration Information :';
        // registrationDetailObj.subItem = 'BGMEA Reg. No:';
        // registrationDetailObj.itemValue = 'NA';
        // registrationDetailObj.isRowSpan = true;
        // this.registrationDetailList.push(registrationDetailObj);

        // registrationDetailObj = new RegistrationDetail();
        // registrationDetailObj.id = this.getId();
        // registrationDetailObj.item = 'Capital:';
        // registrationDetailObj.subItem = 'Share Capital:';
        // registrationDetailObj.itemValue = 'LKR 696,190,000.00';
        // this.registrationDetailList.push(registrationDetailObj);

        // registrationDetailObj = new RegistrationDetail();
        // registrationDetailObj.id = this.getId();
        // registrationDetailObj.item = 'Capital:';
        // registrationDetailObj.subItem = 'Number of Share:';
        // registrationDetailObj.itemValue = 'LKR 69,619,000.00';
        // this.registrationDetailList.push(registrationDetailObj);

        // registrationDetailObj = new RegistrationDetail();
        // registrationDetailObj.id = this.getId();
        // registrationDetailObj.item = 'Capital:';
        // registrationDetailObj.subItem = 'Per Share Value:';
        // registrationDetailObj.itemValue = 'NA';
        // this.registrationDetailList.push(registrationDetailObj);

        // registrationDetailObj = new RegistrationDetail();
        // registrationDetailObj.id = this.getId();
        // registrationDetailObj.item = 'Legal Status:';
        // registrationDetailObj.subItem = '';
        // registrationDetailObj.itemValue = 'Private Limited Liability Company';
        // this.registrationDetailList.push(registrationDetailObj);

        // registrationDetailObj = new RegistrationDetail();
        // registrationDetailObj.id = this.getId();
        // registrationDetailObj.item = 'Secretary';
        // registrationDetailObj.subItem = '';
        // registrationDetailObj.itemValue = 'Corporate Services (Private) Limited Address: No. 216, De Saram Place, Colombo–10, Sri Lanka';
        // this.registrationDetailList.push(registrationDetailObj);

        // registrationDetailObj = new RegistrationDetail();
        // registrationDetailObj.id = this.getId();
        // registrationDetailObj.item = 'Issuing Authority:';
        // registrationDetailObj.subItem = '';
        // registrationDetailObj.itemValue = 'The Department of the Registrar of Companies, Sri Lanka.';
        // this.registrationDetailList.push(registrationDetailObj);

        this.loader.show();
        this.registrationDetailService.getList(this.companyInfo.id).subscribe({
            next: (data) => {
                this.registrationDetailList = data.data;
            },
            complete: () => {
                this.registrationDetailList.forEach(obj => {
                    obj.isEdit = false;
                });

                this.loader.hide();
            },
            error: (err) => {
                console.log(err);
                this.loader.hide();
            },
        });
    }

    onEdit(registrationDetailObj: RegistrationDetail) {
        this.oldRegistrationDetailObj = registrationDetailObj;
        this.registrationDetailList.forEach(obj => {
            obj.isEdit = false;
        });
        registrationDetailObj.isEdit = true;

    }

    onDelete(registrationDetailObj: RegistrationDetail) {
        this.registrationDetailList.splice(this.registrationDetailList.findIndex(e => e.id === registrationDetailObj.id), 1);
    }

    onAdd() {
        this.oldRegistrationDetailObj = null;

        this.newRegistrationDetailObj = new RegistrationDetail();
        this.newRegistrationDetailObj.item = '';
        this.newRegistrationDetailObj.subItem = '';
        this.newRegistrationDetailObj.itemValue = '';
        this.newRegistrationDetailObj.isEdit = true;

        this.registrationDetailList.push(this.newRegistrationDetailObj);
    }

    addRow(index: number) {
        this.oldRegistrationDetailObj = null;

        this.newRegistrationDetailObj = new RegistrationDetail();
        this.newRegistrationDetailObj.item = '';
        this.newRegistrationDetailObj.subItem = '';
        this.newRegistrationDetailObj.itemValue = '';
        this.newRegistrationDetailObj.isEdit = true;

        this.registrationDetailList.splice(index + 1, 0, this.newRegistrationDetailObj);
    }

    onUpdate(registrationDetailObj: RegistrationDetail) {
        console.log(registrationDetailObj);
        registrationDetailObj.isEdit = false;
    }

    onCancel(registrationDetailObj: RegistrationDetail) {
        if (this.oldRegistrationDetailObj == undefined || this.oldRegistrationDetailObj == null) {
            registrationDetailObj.isEdit = true;
            this.registrationDetailList.splice(this.registrationDetailList.findIndex(e => e.id === registrationDetailObj.id), 1);
        } else {

            registrationDetailObj.item = this.oldRegistrationDetailObj.item;
            registrationDetailObj.subItem = this.oldRegistrationDetailObj.subItem;
            registrationDetailObj.itemValue = this.oldRegistrationDetailObj.itemValue;
            registrationDetailObj.isEdit = false;
        }

    }

    onSave() {
        this.registrationDetailList.forEach(obj => {
            obj.companyInfo = this.companyInfo;
        });

        this.setSequence();

        if (this.registrationDetailList.length > 0) {
            this.loader.show();

            this.registrationDetailService.save(this.registrationDetailList, this.companyInfo.id).subscribe({
                next: (response) => {
                    console.log(response);
                    this.notifyService.showSuccess("success", response.message);

                    this.router.navigate(["admin/financial-info"]);
                },
                complete: () => {
                    this.getList();
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

    setSequence() {
        let previousObj = new RegistrationDetail();
        let i = 0;
        let sequence = 1;
        this.registrationDetailList.forEach(obj => {

            if (i == 0) {
                obj.sequence = sequence;
                previousObj = obj;
            } else if (previousObj.item === obj.item) {
                obj.sequence = sequence;
                previousObj = obj;
            } else {
                sequence++;
                obj.sequence = sequence;
                previousObj = obj;
            }
            i++;
        });
    }

    validateField(item: any) {
        if (item !== '') {
            return false;
        } else {
            return true;
        }

    }

    validateForm(registrationDetailObj: RegistrationDetail) {
        if (registrationDetailObj.item == ''
            && registrationDetailObj.subItem == ''
            && registrationDetailObj.itemValue == '') {
            return true;
        } else {
            return false;
        }
    }

    getId() {
        if (this.registrationDetailList.length == 0) {
            return 1;
        } else {
            let lastRegistrationDetailObj: RegistrationDetail = this.registrationDetailList[this.registrationDetailList.length - 1];
            return lastRegistrationDetailObj.id + 1;
        }
    }

}
