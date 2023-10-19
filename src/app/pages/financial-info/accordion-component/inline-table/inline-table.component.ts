import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompanyInfo } from 'src/app/models/financial-info/company-info.model';
import { OperationInfo } from 'src/app/models/financial-info/operation-info.model';
import { RegistrationDetail } from 'src/app/models/financial-info/registration-detail.model';
import { RegistrationDetailService } from 'src/app/services/financial-info/registration-detail.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
    selector: 'app-inline-table',
    templateUrl: './inline-table.component.html',
    styleUrls: ['./inline-table.component.scss']
})
export class InlineTableComponent implements OnInit {

    title: string;
    registrationDetailList: RegistrationDetail[] = [];
    rows: any[] = [];
    data: any[] = [];
    data2: any[] = [];
    data3: any;
    oldRegistrationDetailObj: RegistrationDetail;
    newRegistrationDetailObj: RegistrationDetail;

    //Operation Information
    operationInfoList: OperationInfo[] = [];
    oprows: any[] = [];
    opdata: any[] = [];

    countryList: any[] = [];
    content: SafeHtml;

    companyInfo: CompanyInfo;


    constructor(
        private sanitizer: DomSanitizer,
        private router: Router,
        private loader: NgxSpinnerService,
        private notifyService: NotificationService,
        private sharedService: SharedService,
        private registrationDetailService: RegistrationDetailService
    ) {
        this.getInnerHtml();
        this.companyInfo = new CompanyInfo();
    }

    ngOnInit(): void {
        this.title = 'Registration Details';

        this.getOperationInfoList();
        // this.getInnerHtml();

        this.companyInfo = this.sharedService.getCompanyInfoObject();
        this.getRegDList();
        this.getRegistrationDetailList();

    }

    getRegistrationDetailList() {
        let registrationDetailObj = new RegistrationDetail();
        registrationDetailObj.id = this.getId();
        registrationDetailObj.item = 'Registration Information';
        registrationDetailObj.subItem = 'Registration Date';
        registrationDetailObj.itemValue = '31st March 2017';
        registrationDetailObj.isRowSpan = false;
        this.registrationDetailList.push(registrationDetailObj);
        this.rows.push({ 'rowspan': 6, 'text': registrationDetailObj.item })
        this.rows.push({ 'rowspan': 1, 'text': registrationDetailObj.subItem })
        this.rows.push({ 'rowspan': 1, 'text': registrationDetailObj.itemValue })
        this.data.push(this.rows);
        this.rows = []

        registrationDetailObj = new RegistrationDetail();
        registrationDetailObj.id = this.getId();
        registrationDetailObj.item = '';
        registrationDetailObj.subItem = 'Company Registration No';
        registrationDetailObj.itemValue = 'AAD44882';
        registrationDetailObj.isRowSpan = true;
        this.registrationDetailList.push(registrationDetailObj);
        this.rows.push({ 'rowspan': 1, 'text': registrationDetailObj.subItem })
        this.rows.push({ 'rowspan': 1, 'text': registrationDetailObj.itemValue })
        this.data.push(this.rows);
        this.rows = []

        registrationDetailObj = new RegistrationDetail();
        registrationDetailObj.id = this.getId();
        registrationDetailObj.item = '';
        registrationDetailObj.subItem = 'Business Identification No(BIN)';
        registrationDetailObj.itemValue = 'NA';
        registrationDetailObj.isRowSpan = true;
        this.registrationDetailList.push(registrationDetailObj);
        this.rows.push({ 'rowspan': 1, 'text': registrationDetailObj.subItem })
        this.rows.push({ 'rowspan': 1, 'text': registrationDetailObj.itemValue })
        this.data.push(this.rows);
        this.rows = []

        registrationDetailObj = new RegistrationDetail();
        registrationDetailObj.id = this.getId();
        registrationDetailObj.item = '';
        registrationDetailObj.subItem = 'Import Registration Certificate No (IRC):';
        registrationDetailObj.itemValue = 'NA';
        registrationDetailObj.isRowSpan = true;
        this.registrationDetailList.push(registrationDetailObj);
        this.rows.push({ 'rowspan': 1, 'text': registrationDetailObj.subItem })
        this.rows.push({ 'rowspan': 1, 'text': registrationDetailObj.itemValue })
        this.data.push(this.rows);
        this.rows = []

        registrationDetailObj = new RegistrationDetail();
        registrationDetailObj.id = this.getId();
        registrationDetailObj.item = '';
        registrationDetailObj.subItem = 'Tax Identification No (TIN):';
        registrationDetailObj.itemValue = 'NA';
        registrationDetailObj.isRowSpan = true;
        this.registrationDetailList.push(registrationDetailObj);
        this.rows.push({ 'rowspan': 1, 'text': registrationDetailObj.subItem })
        this.rows.push({ 'rowspan': 1, 'text': registrationDetailObj.itemValue })
        this.data.push(this.rows);
        this.rows = []

        registrationDetailObj = new RegistrationDetail();
        registrationDetailObj.id = this.getId();
        registrationDetailObj.item = '';
        registrationDetailObj.subItem = 'BGMEA Reg. No:';
        registrationDetailObj.itemValue = 'NA';
        registrationDetailObj.isRowSpan = true;
        this.registrationDetailList.push(registrationDetailObj);
        this.rows.push({ 'rowspan': 1, 'text': registrationDetailObj.subItem })
        this.rows.push({ 'rowspan': 1, 'text': registrationDetailObj.itemValue })
        this.data.push(this.rows);
        this.rows = []


        registrationDetailObj = new RegistrationDetail();
        registrationDetailObj.id = this.getId();
        registrationDetailObj.item = 'Capital:';
        registrationDetailObj.subItem = 'Share Capital:';
        registrationDetailObj.itemValue = 'LKR 696,190,000.00';
        this.registrationDetailList.push(registrationDetailObj);
        this.rows.push({ 'rowspan': 3, 'text': registrationDetailObj.item })
        this.rows.push({ 'rowspan': 1, 'text': registrationDetailObj.subItem })
        this.rows.push({ 'rowspan': 1, 'text': registrationDetailObj.itemValue })
        this.data.push(this.rows);
        this.rows = []

        registrationDetailObj = new RegistrationDetail();
        registrationDetailObj.id = this.getId();
        registrationDetailObj.item = '';
        registrationDetailObj.subItem = 'Number of Share:';
        registrationDetailObj.itemValue = 'LKR 69,619,000.00';
        this.registrationDetailList.push(registrationDetailObj);
        this.rows.push({ 'rowspan': 1, 'text': registrationDetailObj.subItem })
        this.rows.push({ 'rowspan': 1, 'text': registrationDetailObj.itemValue })
        this.data.push(this.rows);
        this.rows = []

        registrationDetailObj = new RegistrationDetail();
        registrationDetailObj.id = this.getId();
        registrationDetailObj.item = '';
        registrationDetailObj.subItem = 'Per Share Value:';
        registrationDetailObj.itemValue = 'NA';
        this.registrationDetailList.push(registrationDetailObj);
        this.rows.push({ 'rowspan': 1, 'text': registrationDetailObj.subItem })
        this.rows.push({ 'rowspan': 1, 'text': registrationDetailObj.itemValue })
        this.data.push(this.rows);
        this.rows = []
        console.log(this.data);

        registrationDetailObj = new RegistrationDetail();
        registrationDetailObj.id = this.getId();
        registrationDetailObj.item = 'Legal Status:';
        registrationDetailObj.subItem = '';
        registrationDetailObj.itemValue = 'Private Limited Liability Company';
        this.registrationDetailList.push(registrationDetailObj);
        this.rows.push({ 'rowspan': 1, 'text': registrationDetailObj.item })
        this.rows.push({ 'colspan': 2, 'text': registrationDetailObj.itemValue })
        this.data.push(this.rows);
        this.rows = []

        registrationDetailObj = new RegistrationDetail();
        registrationDetailObj.id = this.getId();
        registrationDetailObj.item = 'Secretary';
        registrationDetailObj.subItem = '';
        registrationDetailObj.itemValue = 'Corporate Services (Private) Limited Address: No. 216, De Saram Place, Colombo–10, Sri Lanka';
        this.registrationDetailList.push(registrationDetailObj);
        this.rows.push({ 'rowspan': 1, 'text': registrationDetailObj.item })
        this.rows.push({ 'colspan': 2, 'text': registrationDetailObj.itemValue })
        this.data.push(this.rows);
        this.rows = []

        registrationDetailObj = new RegistrationDetail();
        registrationDetailObj.id = this.getId();
        registrationDetailObj.item = 'Issuing Authority:';
        registrationDetailObj.subItem = '';
        registrationDetailObj.itemValue = 'The Department of the Registrar of Companies, Sri Lanka.';
        this.registrationDetailList.push(registrationDetailObj);
        this.rows.push({ 'rowspan': 1, 'text': registrationDetailObj.item })
        this.rows.push({ 'colspan': 2, 'text': registrationDetailObj.itemValue })
        this.data.push(this.rows);
        this.rows = []

        console.log(this.data);

    }

    getRegDList() {
        this.loader.show();
        this.registrationDetailService.getListForReport(this.companyInfo.id).subscribe({
            next: (data) => {
                // this.registrationDetailList = data.data;

                this.data3 = data.data;
                console.log(this.data3);
                this.data3.forEach(obj => {

                    obj.forEach(val => {
                        console.log(val);
                        if (val.rowspan == 0) {
                            delete val.rowspan;
                        }
                        if (val.colspan == 0) {
                            delete val.colspan;
                        }
                    })

                });
                console.log(this.data3);
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

    onRowCreate(index: number) {
        this.oldRegistrationDetailObj = null;

        this.newRegistrationDetailObj = new RegistrationDetail();
        this.newRegistrationDetailObj.item = '';
        this.newRegistrationDetailObj.subItem = '';
        this.newRegistrationDetailObj.itemValue = '';
        this.newRegistrationDetailObj.isEdit = true;

        this.registrationDetailList.splice(index + 1, 0, this.newRegistrationDetailObj);
        // arr.splice(2, 0, "Lene");
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
            obj.isEdit = false;
        });
        console.log(this.registrationDetailList);
    }

    validateField(item: any) {
        if (item !== '') {
            return false;
        } else {
            return true;
        }

    }

    validateForm(registrationDetailObj: RegistrationDetail) {
        if (registrationDetailObj.item !== '' && registrationDetailObj.subItem !== '') {
            return false;
        } else {
            return true;
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



    getOperationInfoList() {
        let operationInfoObj = new OperationInfo();
        operationInfoObj.id = this.getId();
        operationInfoObj.itemCode = 'Activity Status :';
        operationInfoObj.itemValue = 'Active';
        this.operationInfoList.push(operationInfoObj);

        this.oprows.push({ 'rowspan': 1, 'text': operationInfoObj.itemCode })
        this.oprows.push({ 'rowspan': 1, 'text': operationInfoObj.itemValue })
        this.opdata.push(this.oprows);
        this.oprows = []

        operationInfoObj = new OperationInfo();
        operationInfoObj.id = this.getId();
        operationInfoObj.itemCode = 'Activities:';
        operationInfoObj.itemValue = 'Manufacture, Import and Export';
        this.operationInfoList.push(operationInfoObj);
        this.oprows.push({ 'rowspan': 2, 'text': operationInfoObj.itemCode })
        this.oprows.push({ 'rowspan': 1, 'text': operationInfoObj.itemValue })
        this.opdata.push(this.oprows);
        this.oprows = []

        operationInfoObj = new OperationInfo();
        operationInfoObj.id = this.getId();
        operationInfoObj.itemCode = '';
        operationInfoObj.itemValue = 'NAICS Code : 315240 Womens, Girls, and Infants Cut and Sew Apparel Manufacturing 315220 Mens and Boys Cut and Sew Apparel Manufacturing';
        this.operationInfoList.push(operationInfoObj);
        this.oprows.push({ 'rowspan': 1, 'text': operationInfoObj.itemValue, 'htmlTag': 'b' })
        this.opdata.push(this.oprows);
        this.oprows = []

        operationInfoObj = new OperationInfo();
        operationInfoObj.id = this.getId();
        operationInfoObj.itemCode = 'Items Dealing In:';
        operationInfoObj.itemValue = 'Apparel products';
        this.operationInfoList.push(operationInfoObj);
        this.oprows.push({ 'rowspan': 1, 'text': operationInfoObj.itemCode })
        this.oprows.push({ 'rowspan': 1, 'text': operationInfoObj.itemValue })
        this.opdata.push(this.oprows);
        this.oprows = []

        operationInfoObj = new OperationInfo();
        operationInfoObj.id = this.getId();
        operationInfoObj.itemCode = 'Export/Import Permit:';
        operationInfoObj.itemValue = 'Yes';
        this.operationInfoList.push(operationInfoObj);
        this.oprows.push({ 'rowspan': 1, 'text': operationInfoObj.itemCode })
        this.oprows.push({ 'rowspan': 1, 'text': operationInfoObj.itemValue })
        this.opdata.push(this.oprows);
        this.oprows = []

        operationInfoObj = new OperationInfo();
        operationInfoObj.id = this.getId();
        operationInfoObj.itemCode = 'Purchasing Terms Domestic:';
        operationInfoObj.itemValue = 'Mostly within agreed terms, in individual cases installment payments';
        this.operationInfoList.push(operationInfoObj);
        this.oprows.push({ 'rowspan': 1, 'text': operationInfoObj.itemCode })
        this.oprows.push({ 'rowspan': 1, 'text': operationInfoObj.itemValue })
        this.opdata.push(this.oprows);
        this.oprows = []

        operationInfoObj = new OperationInfo();
        operationInfoObj.id = this.getId();
        operationInfoObj.itemCode = 'Purchasing Terms International:';
        operationInfoObj.itemValue = 'Letter of Credit (At-sight/Defferd), Telegraphic Transfer (T/T).';
        this.operationInfoList.push(operationInfoObj);
        this.oprows.push({ 'rowspan': 1, 'text': operationInfoObj.itemCode })
        this.oprows.push({ 'rowspan': 1, 'text': operationInfoObj.itemValue })
        this.opdata.push(this.oprows);
        this.oprows = []

        operationInfoObj = new OperationInfo();
        operationInfoObj.id = this.getId();
        operationInfoObj.itemCode = 'Export Market:';
        operationInfoObj.itemValue = 'Australia::Hong–Kong::USA';
        this.operationInfoList.push(operationInfoObj);
        this.oprows.push({ 'rowspan': 1, 'text': operationInfoObj.itemCode, 'htmlTag': 'li' })
        this.oprows.push({ 'rowspan': 1, 'text': operationInfoObj.itemValue, 'htmlTag': 'li' })
        this.opdata.push(this.oprows);
        this.oprows = []

        operationInfoObj = new OperationInfo();
        operationInfoObj.id = this.getId();
        operationInfoObj.itemCode = 'Import Form:';
        operationInfoObj.itemValue = 'China::India::Thailand';
        this.operationInfoList.push(operationInfoObj);
        this.oprows.push({ 'rowspan': 1, 'text': operationInfoObj.itemCode, 'htmlTag': 'li' })
        this.oprows.push({ 'rowspan': 1, 'text': operationInfoObj.itemValue, 'htmlTag': 'li' })
        this.opdata.push(this.oprows);
        this.oprows = []

    }

    getInnerHtml() {

        this.countryList.push('Bangladesh');
        this.countryList.push('China');
        this.countryList.push('India');
        this.countryList.push('Pakistan');
        this.countryList.push('Austrila');
        this.countryList.push('England');

        // let c = 'England'

        // return "<ul> <li *ngFor='let country of countryList; index as i'>{{i}}</li> </ul>";
        let html =
            `<ul>         
            <li>Bangladesh</li>
            <li>China</li>
            <li>India</li>
            <li *ngFor="let c of countryList;">
                {{c}}
            </li>        
        </ul> `;
        // return html;

        this.content = this.sanitizer.bypassSecurityTrustHtml(
            html
        );
    }

    getItems(items: any): any {
        return items.split('::');
    }

    setWordBold(str: string) {
        let splitString: any[] = [];
        splitString = str.split(':');
        let strr;
        splitString.forEach(element => {
            strr = strr + `<b>` + element + ` :</b>`
        });
        // return `<b>` + splitString[0] + ` :</b>` + splitString[1];
        return strr;
    }

    setBold() {
        // const str = "aaaaa: lorem ipsum bb: do lor sit amet ccc: no pro movet";

        // const boldArr = str.replace(/(\b[^\s]+)(:)/g, `\n${'$1'.bold()}$2`).split('\n').filter(x => x).map(x => x.trim());
        // console.log(boldArr);

        const str = "aaaaa: lorem ipsum bb: do lor sit amet ccc: no pro movet";

        const boldArr = str.replace(/(\b[^\s]+)(:)/g, `\n<b>${'$1'}$2</b>`).split('\n').filter(x => x).map(x => x.trim());
        console.log(boldArr);
        return boldArr;
    }
}

