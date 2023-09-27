import { Component, OnInit } from '@angular/core';
import { Management } from 'src/app/models/financial-info/management.model';

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
    isExcel: boolean = false;

    constructor() { }

    ngOnInit(): void {
        this.title = 'Management';

        this.getManagementList();
    }


    getManagementList() {
        let managementObj = new Management();
        managementObj.id = this.getId();
        managementObj.itemCode = 'Name'
        managementObj.itemValue = 'Mr. Wickramasinghe Senanayake Appuhamilage Vipul Abayanga Senanayake'
        this.managementList.push(managementObj);

        managementObj = new Management();
        managementObj.id = this.getId();
        managementObj.itemCode = 'Designation:'
        managementObj.itemValue = 'Managing Director'
        this.managementList.push(managementObj);

        managementObj = new Management();
        managementObj.id = this.getId();
        managementObj.itemCode = 'NIC/Passport No.'
        managementObj.itemValue = '692440129 V'
        this.managementList.push(managementObj);

        managementObj = new Management();
        managementObj.id = this.getId();
        managementObj.itemCode = 'Address:'
        managementObj.itemValue = 'No. 45/2, Negombo Road, Bopitiya, Sri Lanka'
        this.managementList.push(managementObj);

        managementObj = new Management();
        managementObj.id = this.getId();
        managementObj.itemCode = 'Nationality:'
        managementObj.itemValue = 'Sri Lankan'
        this.managementList.push(managementObj);
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

    onSave() {
        this.managementList.forEach(obj => {
            obj.isEdit = false;
        });
        console.log(this.managementList);
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
