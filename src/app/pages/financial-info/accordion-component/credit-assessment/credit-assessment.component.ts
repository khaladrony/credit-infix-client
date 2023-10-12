import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompanyInfo } from 'src/app/models/financial-info/company-info.model';
import { CreditAssessment } from 'src/app/models/financial-info/credit-assessment.model';
import { CreditAssessmentService } from 'src/app/services/financial-info/credit-assessment.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
    selector: 'app-credit-assessment',
    templateUrl: './credit-assessment.component.html',
    styleUrls: ['./credit-assessment.component.scss']
})
export class CreditAssessmentComponent implements OnInit {
    title: string;
    companyInfo: CompanyInfo;
    creditAssessment: CreditAssessment;

    currency: string;
    maximumCredit: string;
    grade: string;
    gradeRange: string;
    creditRating: string;
    creditRatingStatus: string;
    riskStatus: string;


    constructor(
        private sharedService: SharedService,
        private CAService: CreditAssessmentService,
        private loader: NgxSpinnerService
    ) {
        this.creditAssessment = new CreditAssessment();
        this.companyInfo = new CompanyInfo();
    }

    ngOnInit(): void {
        this.title = 'Credit Assessment';

        this.companyInfo = this.sharedService.getCompanyInfoObject();

        this.getInfo(this.companyInfo.id);

    }

    getInfo(id: number) {
        let data = {};
        this.loader.show();
        this.CAService.getInfo(id).subscribe({
            next: (data) => {
                this.creditAssessment = data.data;
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

    styleBackgroundColor() {
        let colorCode = "#" + this.creditAssessment.colorCode; //'#ffc107'
        return { 'background-color': colorCode };
    }

    styleRiskAssessmentArrowImg() {
        let paddingPercent = this.creditAssessment.paddingPercent + "%";
        return { 'padding-bottom': '15px', 'padding-left': paddingPercent }
    }
}
