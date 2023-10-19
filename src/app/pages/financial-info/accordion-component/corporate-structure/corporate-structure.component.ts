import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompanyInfo } from 'src/app/models/financial-info/company-info.model';
import { CorporateStructure } from 'src/app/models/financial-info/corporate-structure.model';
import { ExcelUploadService } from 'src/app/services/excel-upload.service';
import { CorporateStructureService } from 'src/app/services/financial-info/corporate-structure.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SharedService } from 'src/app/services/shared/shared.service';

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

    constructor(
        private router: Router,
        private excelUploadService: ExcelUploadService,
        private loader: NgxSpinnerService,
        private notifyService: NotificationService,
        private sharedService: SharedService,
        private corporateStructureService: CorporateStructureService
    ) {
        this.companyInfo = new CompanyInfo();
    }

    ngOnInit(): void {
        this.title = 'Corporate Structure';

        this.companyInfo = this.sharedService.getCompanyInfoObject();
        this.getList();
    }

    getList() {
        // let corporateStructureObj = new CorporateStructure();
        // corporateStructureObj.id = this.getId();
        // corporateStructureObj.itemCode = 'Number of Employee:';
        // corporateStructureObj.itemValue = '1,000+';
        // this.corporateStructureList.push(corporateStructureObj);

        // corporateStructureObj = new CorporateStructure();
        // corporateStructureObj.id = this.getId();
        // corporateStructureObj.itemCode = 'Listed Status:';
        // corporateStructureObj.itemValue = 'Not Listed';
        // this.corporateStructureList.push(corporateStructureObj);

        // corporateStructureObj = new CorporateStructure();
        // corporateStructureObj.id = this.getId();
        // corporateStructureObj.itemCode = 'Listed Status:';
        // corporateStructureObj.itemValue = 'Stock Code : NA';
        // this.corporateStructureList.push(corporateStructureObj);

        // corporateStructureObj = new CorporateStructure();
        // corporateStructureObj.id = this.getId();
        // corporateStructureObj.itemCode = 'Listed Status:';
        // corporateStructureObj.itemValue = 'Stock Exchange : NA';
        // this.corporateStructureList.push(corporateStructureObj);

        // corporateStructureObj = new CorporateStructure();
        // corporateStructureObj.id = this.getId();
        // corporateStructureObj.itemCode = 'Holding Company:';
        // corporateStructureObj.itemValue = 'Sterling Apparel Limited';
        // this.corporateStructureList.push(corporateStructureObj);

        // corporateStructureObj = new CorporateStructure();
        // corporateStructureObj.id = this.getId();
        // corporateStructureObj.itemCode = 'Holding Company:';
        // corporateStructureObj.itemValue = 'Address: No. 18–20/F, Win Plaza, 9 Sheung Hai Street, San Po Kong, Hong Kong';
        // this.corporateStructureList.push(corporateStructureObj);

        // corporateStructureObj = new CorporateStructure();
        // corporateStructureObj.id = this.getId();
        // corporateStructureObj.itemCode = 'Holding Company:';
        // corporateStructureObj.itemValue = 'Factory: Zhi Wei (Guangzhou) Garment Co., Limited';
        // this.corporateStructureList.push(corporateStructureObj);

        // corporateStructureObj = new CorporateStructure();
        // corporateStructureObj.id = this.getId();
        // corporateStructureObj.itemCode = 'Holding Company:';
        // corporateStructureObj.itemValue = `Address: 2/F, Block A, Heyu Industrial Park, Chao Tian Industrial Zone,
        // Song Shan Road, Shi Lou Town, Panyu City, Guangdong, P.R.C.`;
        // this.corporateStructureList.push(corporateStructureObj);

        // corporateStructureObj = new CorporateStructure();
        // corporateStructureObj.id = this.getId();
        // corporateStructureObj.itemCode = 'Sister Concern:';
        // corporateStructureObj.itemValue = `Sterling Group Holdings Limited::Chiefway International Limited::Chiefway (Private) Limited`;
        // this.corporateStructureList.push(corporateStructureObj);

        // corporateStructureObj = new CorporateStructure();
        // corporateStructureObj.id = this.getId();
        // corporateStructureObj.itemCode = 'Affiliated Companies:';
        // corporateStructureObj.itemValue = `Nil`;
        // this.corporateStructureList.push(corporateStructureObj);

        // corporateStructureObj = new CorporateStructure();
        // corporateStructureObj.id = this.getId();
        // corporateStructureObj.itemCode = 'Adverse Data Monitoring:';
        // corporateStructureObj.itemValue = "Dishonored Checks:No Records Found";
        // this.corporateStructureList.push(corporateStructureObj);

        // corporateStructureObj = new CorporateStructure();
        // corporateStructureObj.id = this.getId();
        // corporateStructureObj.itemCode = 'Adverse Data Monitoring:';
        // corporateStructureObj.itemValue = `Debt:No Records Found`;
        // this.corporateStructureList.push(corporateStructureObj);

        // corporateStructureObj = new CorporateStructure();
        // corporateStructureObj.id = this.getId();
        // corporateStructureObj.itemCode = 'Adverse Data Monitoring:';
        // corporateStructureObj.itemValue = `Litigation:No Records Found`;
        // this.corporateStructureList.push(corporateStructureObj);

        // corporateStructureObj = new CorporateStructure();
        // corporateStructureObj.id = this.getId();
        // corporateStructureObj.itemCode = 'Adverse Data Monitoring:';
        // corporateStructureObj.itemValue = `Performance Defaults:No Records Found`;
        // this.corporateStructureList.push(corporateStructureObj);

        // corporateStructureObj = new CorporateStructure();
        // corporateStructureObj.id = this.getId();
        // corporateStructureObj.itemCode = 'Adverse Data Monitoring:';
        // corporateStructureObj.itemValue = `Adverse Press Coverage:No Records Found`;
        // this.corporateStructureList.push(corporateStructureObj);

        // corporateStructureObj = new CorporateStructure();
        // corporateStructureObj.id = this.getId();
        // corporateStructureObj.itemCode = 'Adverse Data Monitoring:';
        // corporateStructureObj.itemValue = `Money Laundering:No Records Found`;
        // this.corporateStructureList.push(corporateStructureObj);


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

                this.loader.hide();
            },
            error: (err) => {
                console.log(err);
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

            this.corporateStructureService.save(this.corporateStructureList, this.companyInfo.id).subscribe({
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
