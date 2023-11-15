import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompanyInfo } from 'src/app/models/financial-info/company-info.model';
import { RiskProfile } from 'src/app/models/financial-info/risk-profile.model';
import { ExcelUploadService } from 'src/app/services/excel-upload.service';
import { RiskProfileService } from 'src/app/services/financial-info/risk-profile.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { StoredProcedureExecuteService } from 'src/app/services/stored-procedure-execute.service';

@Component({
    selector: 'app-risk-profile',
    templateUrl: './risk-profile.component.html',
    styleUrls: ['./risk-profile.component.scss']
})
export class RiskProfileComponent implements OnInit {

    title: string;
    riskProfileList: RiskProfile[] = [];
    oldRiskProfileObj: RiskProfile;
    newRiskProfileObj: RiskProfile;
    trGroupMax: number;
    companyInfo: CompanyInfo;
    templateBtnShow: boolean = false;

    constructor(
        private router: Router,
        private excelUploadService: ExcelUploadService,
        private loader: NgxSpinnerService,
        private notifyService: NotificationService,
        private sharedService: SharedService,
        private riskProfileService: RiskProfileService,
        private storedProcedureExecuteService: StoredProcedureExecuteService
    ) {
        this.companyInfo = new CompanyInfo();
        this.companyInfo = this.sharedService.getCompanyInfoObject();
    }

    ngOnInit(): void {
        this.title = 'Risk Profile';

        this.getList();
    }

    getPercentage(value: number) {
        return value+'%';
    }

    getList() {        
        this.loader.show();
        this.riskProfileService.getList(this.companyInfo.id).subscribe({
            next: (data) => {
                this.riskProfileList = data.data;
            },
            complete: () => {
                this.riskProfileList.forEach(obj => {
                    obj.isEdit = false;
                });

                this.templateButtonActivate();

                this.loader.hide();
            },
            error: (err) => {
                console.log(err);
                this.loader.hide();
            },
        });
    }

    templateButtonActivate() {
        if (this.riskProfileList.length == 0
            && this.companyInfo.id > 0) {
            this.templateBtnShow = true;
        }
    }

    addTemplate() {
        let templateName = 'risk_profile';
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
        this.riskProfileList.forEach(obj => {
            obj.companyInfo = this.companyInfo;
        });
        console.log(this.riskProfileList);

        if (this.riskProfileList.length > 0) {
            this.loader.show();

            this.riskProfileService.save(this.riskProfileList, this.companyInfo.id).subscribe({
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

    onEdit(riskProfileObj: RiskProfile) {
        this.oldRiskProfileObj = riskProfileObj;
        this.riskProfileList.forEach(obj => {
            obj.isEdit = false;
        });
        riskProfileObj.isEdit = true;

    }

    onDelete(riskProfileObj: RiskProfile) {
        this.riskProfileList.splice(this.riskProfileList.findIndex(e => e.id === riskProfileObj.id), 1);
    }

    onAdd() {
        this.oldRiskProfileObj = null;

        this.newRiskProfileObj = new RiskProfile();
        this.newRiskProfileObj.id = this.getId();
        this.newRiskProfileObj.itemCode = '';
        this.newRiskProfileObj.percentage = 0;
        this.newRiskProfileObj.status = '';
        this.newRiskProfileObj.isEdit = true;
        this.riskProfileList.push(this.newRiskProfileObj);
    }

    onUpdate(riskProfileObj: RiskProfile) {
        console.log(riskProfileObj);
        riskProfileObj.isEdit = false;
    }

    onCancel(riskProfileObj: RiskProfile) {
        if (this.oldRiskProfileObj == undefined || this.oldRiskProfileObj == null) {
            riskProfileObj.isEdit = true;
            this.riskProfileList.splice(this.riskProfileList.findIndex(e => e.id === riskProfileObj.id), 1);
        } else {

            riskProfileObj.itemCode = this.oldRiskProfileObj.itemCode;
            riskProfileObj.percentage = this.oldRiskProfileObj.percentage;
            riskProfileObj.status = this.oldRiskProfileObj.status;
            riskProfileObj.isEdit = false;
        }

    }

    validateField(item: any) {
        if (item !== '') {
            return false;
        } else {
            return true;
        }

    }

    validateForm(riskProfileObj: RiskProfile) {
        if (riskProfileObj.itemCode !== '' && riskProfileObj.percentage != 0) {
            return false;
        } else {
            return true;
        }
    }

    getId() {
        if (this.riskProfileList.length == 0) {
            return 1;
        } else {
            let lastRiskProfileObj: RiskProfile = this.riskProfileList[this.riskProfileList.length - 1];
            return lastRiskProfileObj.id + 1;
        }
    }
}
