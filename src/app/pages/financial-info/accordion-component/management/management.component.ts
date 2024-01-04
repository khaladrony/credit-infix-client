import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompanyInfo } from 'src/app/models/financial-info/company-info.model';
import { Management } from 'src/app/models/financial-info/management.model';
import { ExcelUploadService } from 'src/app/services/excel-upload.service';
import { ManagementService } from 'src/app/services/financial-info/management.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SharedService } from 'src/app/services/shared/shared.service';

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
    trGroupMax: number;
    companyInfo: CompanyInfo;
    isUpdateMode: boolean = false;
    btnLabel: string = 'Save';

    constructor(
        private router: Router,
        private excelUploadService: ExcelUploadService,
        private loader: NgxSpinnerService,
        private notifyService: NotificationService,
        private sharedService: SharedService,
        private managementService:ManagementService
    ) { 
        this.companyInfo = new CompanyInfo();
        this.companyInfo = this.sharedService.getCompanyInfoObject();
    }

    ngOnInit(): void {
        this.title = 'Management';
        this.getList();
    }


    getList() {
        this.loader.show();
        this.managementService.getList(this.companyInfo.id).subscribe({
            next: (data) => {
                this.managementList = data.data;
            },
            complete: () => {
                this.managementList.forEach(obj => {
                    obj.isEdit = false;
                });

                this.saveAndUpdateBtnChange();
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

    onSave() {
        this.managementList.forEach(obj => {
            obj.companyInfo = this.companyInfo;
        });
        console.log(this.managementList);

        if (this.managementList.length > 0) {
            this.loader.show();

            this.managementService.save(this.managementList, this.companyInfo.id, this.btnLabel).subscribe({
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

    onEdit(managementObj: Management) {
        this.oldManagementObj = managementObj;
        this.managementList.forEach(obj => {
            obj.isEdit = false;
        });
        managementObj.isEdit = true;

    }

    onDelete(managementObj: Management) {
        this.managementList.splice(this.managementList.findIndex(e => e.id === managementObj.id), 1);
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
            this.managementList.splice(this.managementList.findIndex(e => e.id === managementObj.id), 1);
        } else {

            managementObj.itemCode = this.oldManagementObj.itemCode;
            managementObj.itemValue = this.oldManagementObj.itemValue;
            managementObj.isEdit = false;
        }

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

    // Excel upload    
    onExcelFileUpload(event: any) {
        let fileName = event.target.files[0].name;
        let regex = /(.xlsx|.xls)$/;
        this.managementList = [];

        if (regex.test(fileName.toLowerCase())) {
            let formData = new FormData();
            formData.append('file', event.target.files[0]);
            formData.append('fileName', event.target.files[0].name);
            formData.append('type', event.target.files[0].type);
            formData.append('size', event.target.files[0].size);

            this.loader.show();

            this.excelUploadService.managementFile(formData).subscribe({
                next: (response) => {
                    console.log(response);
                    this.managementList = response.data.responseDTOs;

                    this.trGroupMax = Math.max.apply(null, this.managementList.map(function (o) { return o.sequence; }));
                },
                complete: () => {
                    event.target.value = null;
                    this.loader.hide();
                },
                error: (err) => {
                    console.log(err);
                    this.loader.hide();
                    event.target.value = null;
                    this.notifyService.showError('error', err.error?.message);
                }
            });

        } else {
            this.notifyService.showError('error', 'Please upload a valid Excel file!');
            event.target.value = null;
            this.loader.hide();
        }
    }

    styleObject(index: number): Object {

        if (index == 1) {
            return { 'border-top': '2px solid  #e9ecef' };
        } else if (index % this.trGroupMax == 0) {
            return { 'border-bottom': '2px solid  #e9ecef' };
        }

    }

}
