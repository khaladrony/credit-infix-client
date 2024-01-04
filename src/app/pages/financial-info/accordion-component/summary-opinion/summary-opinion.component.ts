import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompanyInfo } from 'src/app/models/financial-info/company-info.model';
import { SummaryOpinion } from 'src/app/models/financial-info/summary-opinion.model';
import { SummaryOpinionService } from 'src/app/services/financial-info/summary-opinion.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { StoredProcedureExecuteService } from 'src/app/services/stored-procedure-execute.service';

@Component({
    selector: 'app-summary-opinion',
    templateUrl: './summary-opinion.component.html',
    styleUrls: ['./summary-opinion.component.scss']
})
export class SummaryOpinionComponent implements OnInit {
    title: string;
    summaryOpinionList: SummaryOpinion[] = [];
    oldSummaryOpinionObj: SummaryOpinion;
    newSummaryOpinionObj: SummaryOpinion;
    companyInfo: CompanyInfo;
    templateBtnShow: boolean = false;
    isUpdateMode: boolean = false;
    btnLabel: string = 'Save';

    constructor(
        private router: Router,
        private loader: NgxSpinnerService,
        private notifyService: NotificationService,
        private sharedService: SharedService,
        private summaryOpinionService:SummaryOpinionService,
        private storedProcedureExecuteService: StoredProcedureExecuteService
    ) { 
        this.companyInfo = new CompanyInfo();
        this.companyInfo = this.sharedService.getCompanyInfoObject();
    }

    ngOnInit(): void {
        this.title = 'Summary Opinion';
        this.getSummaryOpinionList();
    }


    getSummaryOpinionList() {
        this.loader.show();
        this.summaryOpinionService.getList(this.companyInfo.id).subscribe({
            next: (data) => {
                this.summaryOpinionList = data.data;
            },
            complete: () => {
                this.summaryOpinionList.forEach(obj => {
                    obj.isEdit = false;
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
        if (this.summaryOpinionList.length == 0
            && this.companyInfo.id > 0) {
            this.templateBtnShow = true;
        }
    }

    addTemplate() {
        let templateName = 'summary_opinion';
        this.storedProcedureExecuteService.execute(templateName, this.companyInfo.id).subscribe({
            next: (response) => {
                console.log(response);
                this.notifyService.showSuccess("success", response.message);

                this.router.navigate(["admin/financial-info"]);
            },
            complete: () => {
                this.getSummaryOpinionList();
                this.loader.hide();
            },
            error: (err) => {
                console.log(err);
                this.notifyService.showError("error", err.error?.message);
                this.loader.hide();
            },
        });
    }

    onEdit(summaryOpinionObj: SummaryOpinion) {
        this.oldSummaryOpinionObj = summaryOpinionObj;
        this.summaryOpinionList.forEach(obj => {
            obj.isEdit = false;
        });
        summaryOpinionObj.isEdit = true;

    }

    onDelete(summaryOpinionObj: SummaryOpinion) {
        this.summaryOpinionList.splice(this.summaryOpinionList.findIndex(e => e.id === summaryOpinionObj.id), 1);
    }

    onAdd() {
        this.oldSummaryOpinionObj = null;

        this.newSummaryOpinionObj = new SummaryOpinion();
        this.newSummaryOpinionObj.id = this.getId();
        this.newSummaryOpinionObj.itemCode = '';
        this.newSummaryOpinionObj.itemValue = '';
        this.newSummaryOpinionObj.isEdit = true;
        this.summaryOpinionList.push(this.newSummaryOpinionObj);
    }

    addRow(index: number) {
        this.oldSummaryOpinionObj = null;

        this.newSummaryOpinionObj = new SummaryOpinion();
        this.newSummaryOpinionObj.id = this.getId();
        this.newSummaryOpinionObj.itemCode = '';
        this.newSummaryOpinionObj.itemValue = '';
        this.newSummaryOpinionObj.isEdit = true;

        this.summaryOpinionList.splice(index + 1, 0, this.newSummaryOpinionObj);
    }

    onUpdate(summaryOpinionObj: SummaryOpinion) {
        console.log(summaryOpinionObj);
        summaryOpinionObj.isEdit = false;
    }

    onCancel(summaryOpinionObj: SummaryOpinion) {
        if (this.oldSummaryOpinionObj == undefined || this.oldSummaryOpinionObj == null) {
            summaryOpinionObj.isEdit = true;
            this.summaryOpinionList.splice(this.summaryOpinionList.findIndex(e => e.id === summaryOpinionObj.id), 1);
        } else {

            summaryOpinionObj.itemCode = this.oldSummaryOpinionObj.itemCode;
            summaryOpinionObj.itemValue = this.oldSummaryOpinionObj.itemValue;
            summaryOpinionObj.isEdit = false;
        }

    }

    onSave() {
        this.summaryOpinionList.forEach(obj => {
            obj.companyInfo = this.companyInfo;
        });
        
        if (this.summaryOpinionList.length > 0) {
            this.loader.show();

            this.summaryOpinionService.save(this.summaryOpinionList, this.companyInfo.id, this.btnLabel).subscribe({
                next: (response) => {
                    console.log(response);
                    this.notifyService.showSuccess("success", response.message);

                    this.router.navigate(["admin/financial-info"]);
                },
                complete: () => {
                    this.getSummaryOpinionList();
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

    validateForm(summaryOpinionObj: SummaryOpinion) {
        if (summaryOpinionObj.itemCode == '' && summaryOpinionObj.itemValue == '') {
            return true;
        } else {
            return false;
        }
    }

    getId() {
        if (this.summaryOpinionList.length == 0) {
            return 1;
        } else {
            let lastSummaryOpinionObj: SummaryOpinion = this.summaryOpinionList[this.summaryOpinionList.length - 1];
            return lastSummaryOpinionObj.id + 1;
        }
    }

}
