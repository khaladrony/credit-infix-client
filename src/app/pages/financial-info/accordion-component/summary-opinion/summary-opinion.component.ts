import { Component, OnInit } from '@angular/core';
import { SummaryOpinion } from 'src/app/models/financial-info/summary-opinion.model';

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

    constructor() { }

    ngOnInit(): void {
        this.title = 'Summary Opinion';

        this.getSummaryOpinionList();
    }


    getSummaryOpinionList() {
        let summaryOpinionObj = new SummaryOpinion();
        summaryOpinionObj.id = this.getId();
        summaryOpinionObj.itemCode = 'Summary:';
        summaryOpinionObj.itemValue = `Established in 2017 as a Private Limited Liability Company, subject has been in
        operation for 06 years under the present name style of CHIEFWAY
        KATUNAYAKE (PRIVATE) LIMITED.`;
        this.summaryOpinionList.push(summaryOpinionObj);

        summaryOpinionObj = new SummaryOpinion();
        summaryOpinionObj.id = this.getId();
        summaryOpinionObj.itemCode = '';
        summaryOpinionObj.itemValue = `Mr. Wickramasinghe Senanayake Appuhamilage Vipul Abayanga Senanayake,
        the Managing Director of the company is responsible for its overall
        management, strategic planning and business developments.`;
        this.summaryOpinionList.push(summaryOpinionObj);

        summaryOpinionObj = new SummaryOpinion();
        summaryOpinionObj.id = this.getId();
        summaryOpinionObj.itemCode = '';
        summaryOpinionObj.itemValue = `Subject is engaged in Manufacture, Import and Export of apparel product. It’s
        products includes wide range of blazers, coats, jackets, pants and skirts etc.`;
        this.summaryOpinionList.push(summaryOpinionObj);

        summaryOpinionObj = new SummaryOpinion();
        summaryOpinionObj.id = this.getId();
        summaryOpinionObj.itemCode = '';
        summaryOpinionObj.itemValue = `Market reputation is excellent and no detrimental information was found
        during the course of investigation.`;
        this.summaryOpinionList.push(summaryOpinionObj);

        summaryOpinionObj = new SummaryOpinion();
        summaryOpinionObj.id = this.getId();
        summaryOpinionObj.itemCode = '';
        summaryOpinionObj.itemValue = `Payment records are satisfactory and a search of public records and
        bankruptcy courts returned no derogatory information or record of the
        company filing a bankruptcy petition.`;
        this.summaryOpinionList.push(summaryOpinionObj);

        summaryOpinionObj = new SummaryOpinion();
        summaryOpinionObj.id = this.getId();
        summaryOpinionObj.itemCode = 'Opinion:';
        summaryOpinionObj.itemValue = `Based on Subject's Score Factor, Subject has been given a credit rating of C.`;
        this.summaryOpinionList.push(summaryOpinionObj);

        summaryOpinionObj = new SummaryOpinion();
        summaryOpinionObj.id = this.getId();
        summaryOpinionObj.itemCode = '';
        summaryOpinionObj.itemValue = `The company is acceptable for normal business engagements. Risk factors are
        moderate level.`;
        this.summaryOpinionList.push(summaryOpinionObj);
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
            obj.isEdit = false;
        });
        console.log(this.summaryOpinionList);
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
