import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompanyInfo } from 'src/app/models/financial-info/company-info.model';
import { CorporateStructure } from 'src/app/models/financial-info/corporate-structure.model';
import { ExcelUploadService } from 'src/app/services/excel-upload.service';
import { CorporateStructureService } from 'src/app/services/financial-info/corporate-structure.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { StoredProcedureExecuteService } from 'src/app/services/stored-procedure-execute.service';

@Component({
    selector: 'app-corporate-structure',
    templateUrl: './corporate-structure.component.html',
    styleUrls: ['./corporate-structure.component.scss']
})
export class CorporateStructureComponent implements OnInit {

    title: string;
    corporateStructureList: CorporateStructure[] = [];
    oldCorporateStructureObj: CorporateStructure;
    newCorporateStructureObj: CorporateStructure;
    companyInfo: CompanyInfo;
    templateBtnShow: boolean = false;
    isUpdateMode: boolean = false;
    btnLabel: string = 'Save';

    constructor(
        private router: Router,
        private excelUploadService: ExcelUploadService,
        private loader: NgxSpinnerService,
        private notifyService: NotificationService,
        private sharedService: SharedService,
        private corporateStructureService: CorporateStructureService,
        private storedProcedureExecuteService: StoredProcedureExecuteService
    ) {
        this.companyInfo = new CompanyInfo();
        this.companyInfo = this.sharedService.getCompanyInfoObject();
    }

    ngOnInit(): void {
        this.title = 'Corporate Structure';
        this.getList();
    }

    getList() {
        this.loader.show();
        this.corporateStructureService.getList(this.companyInfo.id).subscribe({
            next: (data) => {
                this.corporateStructureList = data.data;
            },
            complete: () => {
                this.corporateStructureList.forEach(obj => {
                    obj.isEdit = false;
                    if (obj.itemCode === 'Business Activity:') {
                        obj.itemValue = obj.companyInfo.businessType;
                    }

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
        if (this.corporateStructureList.length == 0
            && this.companyInfo.id > 0) {
            this.templateBtnShow = true;
        }
    }

    addTemplate() {
        let templateName = 'corporate_structure';
        this.storedProcedureExecuteService.execute(templateName, this.companyInfo.id).subscribe({
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

    onSave() {
        this.corporateStructureList.forEach(obj => {
            obj.companyInfo = this.companyInfo;
        });
        
        this.setSequence()

        if (this.corporateStructureList.length > 0) {
            this.loader.show();

            this.corporateStructureService.save(this.corporateStructureList, this.companyInfo.id, this.btnLabel).subscribe({
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
        let previousObj = new CorporateStructure();
        let i = 0;
        let sequence = 1;
        this.corporateStructureList.forEach(obj => {

            if (i == 0) {
                obj.sequence = sequence;
                previousObj = obj;
            } else if (previousObj.itemCode === obj.itemCode) {
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

    onEdit(corporateStructureObj: CorporateStructure) {
        this.oldCorporateStructureObj = corporateStructureObj;
        this.corporateStructureList.forEach(obj => {
            obj.isEdit = false;
        });
        corporateStructureObj.isEdit = true;

    }

    onDelete(corporateStructureObj: CorporateStructure) {
        this.corporateStructureList.splice(this.corporateStructureList.findIndex(e => e.id === corporateStructureObj.id), 1);
    }

    onAdd() {
        this.oldCorporateStructureObj = null;

        this.newCorporateStructureObj = new CorporateStructure();
        this.newCorporateStructureObj.id = this.getId();
        this.newCorporateStructureObj.itemCode = '';
        this.newCorporateStructureObj.itemValue = '';
        this.newCorporateStructureObj.isEdit = true;
        this.corporateStructureList.push(this.newCorporateStructureObj);
    }

    addRow(index: number) {
        this.oldCorporateStructureObj = null;

        this.newCorporateStructureObj = new CorporateStructure();
        this.newCorporateStructureObj.id = this.getId();
        this.newCorporateStructureObj.itemCode = '';
        this.newCorporateStructureObj.itemValue = '';
        this.newCorporateStructureObj.isEdit = true;

        this.corporateStructureList.splice(index + 1, 0, this.newCorporateStructureObj);
    }

    onUpdate(corporateStructureObj: CorporateStructure) {
        console.log(corporateStructureObj);
        corporateStructureObj.isEdit = false;
    }

    onCancel(corporateStructureObj: CorporateStructure) {
        if (this.oldCorporateStructureObj == undefined || this.oldCorporateStructureObj == null) {
            corporateStructureObj.isEdit = true;
            this.corporateStructureList.splice(this.corporateStructureList.findIndex(e => e.id === corporateStructureObj.id), 1);
        } else {

            corporateStructureObj.itemCode = this.oldCorporateStructureObj.itemCode;
            corporateStructureObj.itemValue = this.oldCorporateStructureObj.itemValue;
            corporateStructureObj.isEdit = false;
        }

    }

    validateField(item: any) {
        if (item !== '') {
            return false;
        } else {
            return true;
        }

    }

    validateForm(corporateStructureObj: CorporateStructure) {
        if (corporateStructureObj.itemCode == '' && corporateStructureObj.itemValue == '') {
            return true;
        } else {
            return false;
        }
    }

    getId() {
        if (this.corporateStructureList.length == 0) {
            return 1;
        } else {
            let lastCorporateStructureObj: CorporateStructure = this.corporateStructureList[this.corporateStructureList.length - 1];
            return lastCorporateStructureObj.id + 1;
        }
    }
}
