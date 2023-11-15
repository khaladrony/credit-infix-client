import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BasicInfo } from 'src/app/models/financial-info/basic-info.model';
import { CompanyInfo } from 'src/app/models/financial-info/company-info.model';
import { Contact } from 'src/app/models/financial-info/contact.model';
import { CreditAssessment } from 'src/app/models/financial-info/credit-assessment.model';
import { FinancialSummary } from 'src/app/models/financial-info/financial-summary.model';
import { OrderDetail } from 'src/app/models/financial-info/order-detail.model';
import { RiskProfile } from 'src/app/models/financial-info/risk-profile.model';
import { CompanyInfoService } from 'src/app/services/financial-info/company-info.service';
import { ContactService } from 'src/app/services/financial-info/contact.service';
import { CreditAssessmentService } from 'src/app/services/financial-info/credit-assessment.service';
import { FinancialSummaryService } from 'src/app/services/financial-info/financial-summary.service';
import { LocationService } from 'src/app/services/financial-info/location.service';
import { OrderDetailService } from 'src/app/services/financial-info/order-detail.service';
import { RiskProfileService } from 'src/app/services/financial-info/risk-profile.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { Location } from 'src/app/models/financial-info/location.model';
import { RegistrationDetailService } from 'src/app/services/financial-info/registration-detail.service';
import { Management } from 'src/app/models/financial-info/management.model';
import { ManagementService } from 'src/app/services/financial-info/management.service';
import { Shareholder } from 'src/app/models/financial-info/shareholder.model';
import { ShareholderService } from 'src/app/services/financial-info/shareholder.service';
import { OperationInfoService } from 'src/app/services/financial-info/operation-info.service';
import { OperationInfo } from 'src/app/models/financial-info/operation-info.model';
import { NatureOfBusiness } from 'src/app/models/financial-info/nature-of-business.model';
import { NatureOfBusinessService } from 'src/app/services/financial-info/nature-of-business.service';
import { CorporateStructure } from 'src/app/models/financial-info/corporate-structure.model';
import { CorporateStructureService } from 'src/app/services/financial-info/corporate-structure.service';
import { FinancialInformation } from 'src/app/models/financial-info/financial-information.model';
import { FinancialNote } from 'src/app/models/financial-info/financial-note.model';
import { FinancialInformationService } from 'src/app/services/financial-info/financial-information.service';
import { FinancialNoteService } from 'src/app/services/financial-info/financial-note.service';
import { RiskLevel } from 'src/app/models/financial-info/risk-level.model';
import { RiskLevelService } from 'src/app/services/financial-info/risk-level.service';
import { SummaryOpinion } from 'src/app/models/financial-info/summary-opinion.model';
import { SummaryOpinionService } from 'src/app/services/financial-info/summary-opinion.service';
import { CountryService } from 'src/app/services/financial-info/country.service';
import { Rating } from 'src/app/models/financial-info/rating.model';
import { RatingService } from 'src/app/services/financial-info/rating.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';
import { CurrencyDailyRate } from 'src/app/models/financial-info/currency-daily-rate.model';
import { CurrencyDailyRateService } from 'src/app/services/financial-info/currency-daily-rate.service';
import { UtilService } from 'src/app/services/util.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { DomSanitizer } from '@angular/platform-browser';
import { BankersService } from 'src/app/services/financial-info/bankers.service';
import { Bankers } from 'src/app/models/financial-info/bankers.model';

@Component({
    selector: 'app-main-report',
    templateUrl: './main-report.component.html',
    styleUrls: ['./main-report.component.scss']
})
export class MainReportComponent implements OnInit {

    currentDate: Date = new Date();

    pdfFileName: string;

    companyInfo: CompanyInfo;
    //-----------------
    creditAssessment: CreditAssessment;
    currency: string;
    maximumCredit: string;
    grade: string;
    gradeRange: string;
    creditRating: string;
    creditRatingStatus: string;
    riskStatus: string;
    //-----------------
    financialSummaryList: FinancialSummary[] = [];
    comments: string;
    //-----------------
    riskProfileList: RiskProfile[] = [];
    //-----------------
    orderDetailList: OrderDetail[] = [];
    //-----------------
    contact: Contact;
    //-----------------
    basicInfoList: BasicInfo[] = [];
    //-----------------
    locationList: Location[] = [];
    url: any;
    //-----------------
    regReportData: any;
    //-----------------
    managementList: Management[] = [];
    trGroupMax: number;
    //-----------------
    shareholderList: Shareholder[] = [];
    trGroupMaxShareholder: number;
    //-----------------
    operationInfoList: OperationInfo[] = [];
    operationInfoReportData: any;
    //-----------------
    natureOfBusinessList: NatureOfBusiness[] = [];
    //-----------------
    corporateStructureList: CorporateStructure[] = [];
    corporateStructureReportData: any;
    //-----------------
    bankersList: Bankers[] = [];
    trGroupMaxBankers: number;
    //-----------------
    financialInformationList: FinancialInformation[] = [];
    firstRowData: string;
    financialNoteList: FinancialNote[] = [];
    //-----------------
    recommendedreditInfoList: any[] = [];
    crAssessmentFactorsList: any[] = [];
    //-----------------
    riskLevelList: RiskLevel[] = [];
    //-----------------
    summaryOpinionList: SummaryOpinion[] = [];
    //-----------------
    countryRiskAssessment: string
    //-----------------
    ratingList: Rating[] = [];
    //-----------------
    firstPageData: any[];
    reportName: string;
    reportDate: string;
    //-----------------
    currencyDailyRateList: CurrencyDailyRate[] = [];


    // @ViewChild('content', { static: false }) el!: ElementRef;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private loader: NgxSpinnerService,
        private notifyService: NotificationService,
        private sharedService: SharedService,
        private companyInfoService: CompanyInfoService,
        private CAService: CreditAssessmentService,
        private financialSummaryService: FinancialSummaryService,
        private riskProfileService: RiskProfileService,
        private orderDetailService: OrderDetailService,
        private contactService: ContactService,
        private locationService: LocationService,
        private registrationDetailService: RegistrationDetailService,
        private managementService: ManagementService,
        private shareholderService: ShareholderService,
        private operationInfoService: OperationInfoService,
        private natureOfBusinessService: NatureOfBusinessService,
        private corporateStructureService: CorporateStructureService,
        private financialInformationService: FinancialInformationService,
        private financialNoteService: FinancialNoteService,
        private riskLevelService: RiskLevelService,
        private summaryOpinionService: SummaryOpinionService,
        private countryService: CountryService,
        private ratingService: RatingService,
        private currencyDailyRateService: CurrencyDailyRateService,
        private utilService: UtilService,
        private fileUploadService: FileUploadService,
        private sanitizer: DomSanitizer,
        private bankersService: BankersService
    ) {
        this.companyInfo = new CompanyInfo();
    }

    ngOnInit(): void {

        this.route.queryParams.subscribe((params: any) => {
            this.companyInfo = JSON.parse(params.data);
            if (this.companyInfo != null) {
                this.loadCompanyInfo();
            }
        })
    }

    async convetToPDF_1() {
        var data = document.getElementById('contentToConvert');
        html2canvas(data).then(canvas => {

            var imgData = canvas.toDataURL('image/png');
            var imgWidth = 210;
            var pageHeight = 295;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;
            var doc = new jsPDF('p', 'mm');
            var position = 0;

            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            let totalPages = doc.getNumberOfPages();
            console.log(totalPages);
            for (let i = 1; i <= totalPages; i++) {
                doc.setPage(i);
                doc.text('Page ' + i + ' of ' + totalPages, (doc.internal.pageSize.getWidth() - 100), (doc.internal.pageSize.getHeight() - 20));
            }

            doc.save('Financial-info.pdf');
        });

    }

    convetToPDF_2() {

        const input = document.getElementById('contentToConvert');

        html2canvas(input, { useCORS: true, allowTaint: true, scrollY: 0 }).then((canvas) => {
            const image = { type: 'jpeg', quality: 1.0 };
            const margin = [0.5, 0.5];
            const filename = 'myfile.pdf';

            var imgWidth = 8.5;
            var pageHeight = 10;

            var innerPageWidth = imgWidth - margin[0] * 1;
            var innerPageHeight = pageHeight - margin[1] * 2;

            // Calculate the number of pages.
            var pxFullHeight = canvas.height;
            var pxPageHeight = Math.floor(canvas.width * (pageHeight / imgWidth));
            var nPages = Math.ceil(pxFullHeight / pxPageHeight);

            // Define pageHeight separately so it can be trimmed on the final page.
            var pageHeight = innerPageHeight;

            // Create a one-page canvas to split up the full image.
            var pageCanvas = document.createElement('canvas');
            var pageCtx = pageCanvas.getContext('2d');
            pageCanvas.width = canvas.width;
            pageCanvas.height = pxPageHeight;

            // Initialize the PDF.
            var pdf = new jsPDF('p', 'in', [8.5, 11]);

            for (var page = 0; page < nPages; page++) {

                // Trim the final page to reduce file size.
                if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
                    pageCanvas.height = pxFullHeight % pxPageHeight;
                    pageHeight = (pageCanvas.height * innerPageWidth) / pageCanvas.width;
                }

                // Display the page.
                var w = pageCanvas.width;
                var h = pageCanvas.height;
                pageCtx.fillStyle = 'white';
                pageCtx.fillRect(0, 0, w, h);
                pageCtx.drawImage(canvas, 0, page * pxPageHeight, w, h, 0, 0, w, h);

                // Add the page to the PDF.
                if (page > 0) pdf.addPage();

                var imgData = pageCanvas.toDataURL('image/' + image.type, image.quality);
                pdf.addImage(imgData, image.type, margin[1], 1, innerPageWidth, pageHeight);

                if (page > 0) {
                    this.getPdfHeader(pdf);
                    this.getPdfFooter(pdf, page, nPages);

                    // pdf.setDrawColor('#1f1f6f');
                    // pdf.line(0.8, 10.4, 6.4, 10.4); // horizontal line    
                    // pdf.setLineWidth(0.02);

                    // pdf.setFontSize(8);
                    // pdf.setTextColor('#1f1f6f');
                    // pdf.setFont('Open Sans, sans-serif', 'bold');
                    // pdf.text('Infix Credit | International Credit Information Report | 2023', 0.8, 10.6);
                    // pdf.text('www.infixcredit.com', 0.8, 10.7);
                    // pdf.text('Page ' + (page + 1) + ' of ' + nPages, 7.6, 10.5);
                    // // pdf.addImage('Page ' + (page + 1) + ' of ' + nPages, 7, 10.7);

                    // var img = new Image()
                    // img.src = 'assets/img/logo/footer-logo-right.png'
                    // pdf.addImage(img, 'png', 6.5, 10.3, 1.8, 0.4)
                }


            }

            pdf.save('Financial-info.pdf');
        });
    }

    getPdfHeader(pdf: jsPDF) {
        pdf.setFontSize(8);
        pdf.setTextColor('#1f1f6f');
        pdf.text(this.companyInfo.name, 5.5, 0.7);

        var img = new Image()
        img.src = 'assets/img/logo/infix-logo.png'
        pdf.addImage(img, 'png', 1, 0.4, 1.4, 0.5)

    }

    getPdfFooter(pdf: jsPDF, page: number, nPages: number) {
        console.log(page);
        pdf.setDrawColor('#1f1f6f');
        pdf.line(0.8, 10.4, 6.4, 10.4); // horizontal line    
        pdf.setLineWidth(0.02);

        pdf.setFontSize(8);
        pdf.setTextColor('#1f1f6f');
        pdf.setFont('Open Sans, sans-serif', 'bold');
        pdf.text('Infix Credit | International Credit Information Report | 2023', 0.8, 10.6);
        pdf.text('www.infixcredit.com', 0.8, 10.7);
        pdf.text('Page ' + (page + 1) + ' of ' + nPages, 7.6, 10.5);
        // pdf.addImage('Page ' + (page + 1) + ' of ' + nPages, 7, 10.7);

        var img = new Image()
        img.src = 'assets/img/logo/footer-logo-right.png'
        pdf.addImage(img, 'png', 6.5, 10.3, 1.8, 0.4)


        // if (page == 0) {
        //     pdf.setDrawColor(255, 255, 255);
        //     pdf.line(0.8, 10.4, 7, 10.4); // horizontal line    
        //     pdf.setLineWidth(2);
        // }
    }


    convetToPDF() {
        var jspdf = new jsPDF();

        var elementHTML = document.querySelector("#contentToConvert");

    }

    loadCompanyInfo() {
        // let data = {};
        // this.loader.show();
        // this.companyInfoService.getList(data).subscribe({
        //     next: (data) => {
        //         this.companyInfo = data.data[0];
        //     },
        //     complete: () => {

        //         this.loader.hide();
        //     },
        //     error: (err) => {
        //         console.log(err);
        //         this.loader.hide();
        //     },
        // });

        this.getCreditAssessment(this.companyInfo.id);
        this.getBasicInfoList(this.companyInfo)
        this.getContactList(this.companyInfo.id);
        this.getRegistrationDetail(this.companyInfo.id);
        this.getManagement(this.companyInfo.id);
        this.getShareholder(this.companyInfo.id);
        this.getOperationInfo(this.companyInfo.id);
        this.getNatureOfBusiness(this.companyInfo.id);
        this.getCorporateStructure(this.companyInfo.id);
        this.getBankers(this.companyInfo.id);
        this.getFinancialInformationList(this.companyInfo.id);
        this.getFinancialNoteList(this.companyInfo.id);
        this.getRecommendedCreditStaticData();
        this.getRiskLevelList();
        this.getSummaryOpinionList(this.companyInfo.id);
        this.getCountryRiskAssessmentList(this.companyInfo.country);
        this.getRatingList();
        this.firstPageDataList();
        this.getCurrencyDailyRateList(this.utilService.dateFormat(this.companyInfo.transactionDate, 'yyyy-MM-dd'));

    }

    //First page data START

    firstPageDataList() {
        this.pdfFileName = this.companyInfo.name + '.pdf';
        this.reportName = 'INTERNATIONAL CREDIT INFORMATION REPORT';
        this.reportDate = 'Report Generated on: May 2023';
        this.firstPageData = [
            { key: 'Client Name', value: 'Accolade Search Ltd' },
            { key: `Client's Ref No`, value: 'NA' },
            { key: `Infix Ref No`, value: '16241094ASL' },
            { key: `Service Type`, value: 'Normal 5-6 Working Days' },
            { key: `Inquiry Date`, value: '02-05-2023' },
            { key: `Due Date`, value: '11-05-2023' },
            { key: `Delivery Date`, value: '11-05-2023' }
        ]
    }

    //First page data END

    // Credit Assessment Start
    getCreditAssessment(id: number) {
        let data = {};
        this.loader.show();
        this.CAService.getInfo(id).subscribe({
            next: (data) => {
                this.creditAssessment = data.data;
            },
            complete: () => {
                this.getFinancialSummaryList(id);
                this.loader.hide();
            },
            error: (err) => {
                console.log(err);
                this.loader.hide();
            },
        });
    }

    styleBackgroundColor() {
        let colorCode = "#" + this.creditAssessment?.colorCode; //'#ffc107'
        return { 'background-color': colorCode };
    }

    styleRiskAssessmentArrowImg() {
        let paddingPercent = this.creditAssessment?.paddingPercent + "%";
        return { 'padding-bottom': '5px', 'padding-left': paddingPercent }
    }
    //End

    //FinancialSummary
    getFinancialSummaryList(companyInfoId: number) {
        this.loader.show();
        this.financialSummaryService.getList(companyInfoId).subscribe({
            next: (data) => {
                this.financialSummaryList = data.data;
            },
            complete: () => {
                this.comments = this.financialSummaryList[0].comments;
                this.getRiskProfileList(companyInfoId);
                this.loader.hide();
            },
            error: (err) => {
                console.log(err);
                this.loader.hide();
            },
        });
    }
    //End

    //RiskProfile
    getRiskProfileList(companyInfoId: number) {
        this.loader.show();
        this.riskProfileService.getList(companyInfoId).subscribe({
            next: (data) => {
                this.riskProfileList = data.data;
            },
            complete: () => {
                this.getOrderDetailList(companyInfoId);
                this.loader.hide();
            },
            error: (err) => {
                console.log(err);
                this.loader.hide();
            },
        });
    }

    getPercentage(value: number) {
        return value + '%';
    }

    makeMarginOrderDetail() {
        return { 'margin-bottom': '10%' };
    }
    //END

    //OrderDetail
    getOrderDetailList(companyInfoId: number) {
        this.loader.show();
        this.orderDetailService.getList(companyInfoId).subscribe({
            next: (data) => {
                this.orderDetailList = data.data;
            },
            complete: () => {
                if (this.orderDetailList.length > 0) {
                    this.setCompanyName(this.orderDetailList[0]);
                }
                this.loader.hide();
            },
            error: (err) => {
                console.log(err);
                this.loader.hide();
            },
        });
    }

    setCompanyName(orderDetail: OrderDetail) {
        orderDetail.itemValue = this.getCapitalize(this.companyInfo.name);
    }
    //END

    //Contact
    getContactList(companyInfoId: number) {
        this.loader.show();
        this.contactService.getList(companyInfoId).subscribe({
            next: (data) => {
                if (data.data.length > 0) {
                    this.contact = data.data[0];
                }
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
    //END

    //BasicInfo
    getBasicInfoList(companyInfo: CompanyInfo) {
        let basicInfoObj = new BasicInfo();
        basicInfoObj.itemCode = 'Name:';
        basicInfoObj.itemValue = this.getCapitalize(companyInfo.name);
        this.basicInfoList.push(basicInfoObj);

        basicInfoObj = new BasicInfo();
        basicInfoObj.itemCode = 'Established:';
        basicInfoObj.itemValue = companyInfo.yearEstablished;
        this.basicInfoList.push(basicInfoObj);

        basicInfoObj = new BasicInfo();
        basicInfoObj.itemCode = 'Legal Address:';
        basicInfoObj.itemValue = companyInfo.legalAddress;
        this.basicInfoList.push(basicInfoObj);

        basicInfoObj = new BasicInfo();
        basicInfoObj.itemCode = 'Operation Address:';
        basicInfoObj.itemValue = companyInfo.operationAddress;
        this.basicInfoList.push(basicInfoObj);

        basicInfoObj = new BasicInfo();
        basicInfoObj.itemCode = 'Country:';
        basicInfoObj.itemValue = companyInfo.country;
        this.basicInfoList.push(basicInfoObj);

        basicInfoObj = new BasicInfo();
        basicInfoObj.itemCode = 'Main Activity:';
        basicInfoObj.itemValue = companyInfo.businessType;
        this.basicInfoList.push(basicInfoObj);

        basicInfoObj = new BasicInfo();
        basicInfoObj.itemCode = 'Legal Form:';
        basicInfoObj.itemValue = companyInfo.legalStatus;
        this.basicInfoList.push(basicInfoObj);

        basicInfoObj = new BasicInfo();
        basicInfoObj.itemCode = 'Business Scale:';
        basicInfoObj.itemValue = companyInfo.businessScale;
        this.basicInfoList.push(basicInfoObj);

        basicInfoObj = new BasicInfo();
        basicInfoObj.itemCode = 'Status:';
        basicInfoObj.itemValue = companyInfo.status;
        this.basicInfoList.push(basicInfoObj);

        basicInfoObj = new BasicInfo();
        basicInfoObj.itemCode = 'Listed Status:';
        basicInfoObj.itemValue = companyInfo.listedStatus;
        this.basicInfoList.push(basicInfoObj);

        basicInfoObj = new BasicInfo();
        basicInfoObj.itemCode = 'Payment Practices:';
        basicInfoObj.itemValue = companyInfo.paymentPractices;
        this.basicInfoList.push(basicInfoObj);

        this.getLocation(companyInfo.id);
    }
    //END

    //Location
    getLocation(companyInfoId: number) {
        this.loader.show();
        this.locationService.getList(companyInfoId).subscribe({
            next: (data) => {
                this.locationList = data.data;
            },
            complete: () => {
                this.getImagePathDTO();
                this.loader.hide();
            },
            error: (err) => {
                console.log(err);
                this.loader.hide();
            },
        });
    }

    getImagePathDTO() {
        this.locationService.getImagePathDTO(this.companyInfo.id).subscribe({
            next: (response) => {
                console.log(response);
                this.imagePreview(response.data?.name);
            },
            complete: () => { },
            error: (err) => {
                console.log(err);
                this.notifyService.showError("error", err.error?.message);
            },
        });
    }

    imagePreview(fileName: string) {
        let fileType = 'image/(jpeg|jpg|png|gif|bmp)';

        this.fileUploadService.imagePreview(fileName).subscribe({
            next: (response) => {
                console.log(response)
                const blob = new Blob([response], { type: fileType });
                this.url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
            },
            complete: () => {
            },
            error: (err) => {
                console.log(err);
            }
        });
    }
    //END

    //Registration Detail
    getRegistrationDetail(companyInfoId: number) {
        this.loader.show();
        this.registrationDetailService.getListForReport(companyInfoId).subscribe({
            next: (data) => {

                this.regReportData = data.data;

                this.regReportData.forEach(obj => {

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
    //END

    //Management
    getManagement(companyInfoId: number) {
        this.loader.show();
        this.managementService.getList(companyInfoId).subscribe({
            next: (data) => {
                this.managementList = data.data;
            },
            complete: () => {
                this.trGroupMax = Math.max.apply(null, this.managementList.map(function (o) { return o.sequence; }));

                this.loader.hide();
            },
            error: (err) => {
                console.log(err);
                this.loader.hide();
            },
        });
    }

    styleObjectManagement(index: number): Object {

        if (index == 1) {
            return { 'border-top': '1.4px solid  #cdcbcb' };
        } else if (index % this.trGroupMax == 0) {
            return { 'border-bottom': '1.4px solid  #cdcbcb' };
        }

    }
    //END

    //Shareholder
    getShareholder(companyInfoId: number) {
        this.loader.show();
        this.shareholderService.getList(companyInfoId).subscribe({
            next: (data) => {
                this.shareholderList = data.data;
            },
            complete: () => {
                this.trGroupMaxShareholder = Math.max.apply(null, this.shareholderList.map(function (o) { return o.sequence; }));

                this.loader.hide();
            },
            error: (err) => {
                console.log(err);
                this.loader.hide();
            },
        });
    }

    styleObjectShareholder(index: number): Object {

        if (index == 1) {
            return { 'border-top': '1.4px solid  #cdcbcb' };
        } else if (index % this.trGroupMaxShareholder == 0) {
            return { 'border-bottom': '1.4px solid  #cdcbcb' };
        }
    }
    //END

    //Operation Information
    getOperationInfo(companyInfoId: number) {
        this.loader.show();
        this.operationInfoService.getListForReport(companyInfoId).subscribe({
            next: (data) => {
                this.operationInfoReportData = data.data;

                this.operationInfoReportData.forEach(obj => {

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
    //END

    //NatureOfBusiness
    getNatureOfBusiness(companyInfoId: number) {
        this.loader.show();
        this.natureOfBusinessService.getList(companyInfoId).subscribe({
            next: (data) => {
                this.natureOfBusinessList = data.data;
            },
            complete: () => {
                this.natureOfBusinessList.forEach(obj => {
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
    //END

    //Corporate Structure
    getCorporateStructure(companyInfoId: number) {
        this.loader.show();
        this.corporateStructureService.getListForReport(companyInfoId).subscribe({
            next: (data) => {
                this.corporateStructureReportData = data.data;

                this.corporateStructureReportData.forEach(obj => {

                    obj.forEach(val => {
                        if (val.rowspan == 0) {
                            delete val.rowspan;
                        }
                        if (val.colspan == 0) {
                            delete val.colspan;
                        }
                    })

                });
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

    setWordBold(str: string) {
        let splitString: any[] = [];
        splitString = str.split(':');

        return splitString.length > 1 ? `<b style="font-weight: bold;">` + splitString[0] + ` : </b>` + splitString[1] : str;
    }
    //END

    //Bankers
    getBankers(companyInfoId: number) {
        this.loader.show();
        this.bankersService.getList(companyInfoId).subscribe({
            next: (data) => {
                this.bankersList = data.data;
            },
            complete: () => {
                this.trGroupMaxBankers = Math.max.apply(null, this.bankersList.map(function (o) { return o.sequence; }));

                this.loader.hide();
            },
            error: (err) => {
                console.log(err);
                this.loader.hide();
            },
        });
    }

    styleObjectBankers(index: number): Object {

        if (index == 1) {
            return { 'border-top': '1.4px solid  #cdcbcb' };
        } else if (index % this.trGroupMaxBankers == 0) {
            return { 'border-bottom': '1.4px solid  #cdcbcb' };
        }
    }
    //END

    //FinancialInformation
    getFinancialInformationList(companyInfoId: number) {
        this.firstRowData = 'Figure in' + this.companyInfo.currency + '- Million';
        this.loader.show();
        this.financialInformationService.getList(companyInfoId).subscribe({
            next: (data) => {
                this.financialInformationList = data.data;
            },
            complete: () => {
                this.financialInformationList.forEach(obj => {
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

    getFinancialNoteList(companyInfoId: number) {
        this.loader.show();
        this.financialNoteService.getList(companyInfoId).subscribe({
            next: (data) => {
                this.financialNoteList = data.data;
            },
            complete: () => {
                this.financialNoteList.forEach(obj => {
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

    setBold(str: string) {
        const inputStr = str.replace("\n", "<br />");
        const boldArr = inputStr.replace(/(\b[^\s]+)(:)/g, `\n<b>${'$1'}$2</b>`).split('\n').filter(x => x).map(x => x.trim());
        return boldArr.join("");
    }
    //END

    //CURRENCY EXCHANGE RATE START

    getCurrencyDailyRateList(date: string) {
        this.loader.show();
        let currencyDate: Date = new Date(this.utilService.dateFormat(date, 'yyyy-MM-dd'))
        this.currencyDailyRateService.getListByDate(currencyDate).subscribe({
            next: (data) => {
                this.currencyDailyRateList = data.data;
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

    trimCountryFromCurrency(str: string): string {
        const strArray = str.split("-");
        strArray.shift();
        return strArray.join('').trim();
    }

    //END

    //Static Data
    getRecommendedCreditStaticData() {
        this.recommendedreditInfoList = [
            { range: 'Above 40%', description: 'Above 4 times of base credit limit' },
            { range: `30%-40%`, description: '3 to 4 times of base credit limit' },
            { range: `20%-30%`, description: '2 to 3 times of base credit limit' },
            { range: `10%-20%`, description: '1 to 2 times of base credit limit' },
            { range: 'Below 10%', description: 'within base credit limit' }
        ];

        this.crAssessmentFactorsList = [
            {
                type: 'Financial Strength',
                description: `Including the solvency, profitability, operation
            capacity, development capacity etc.; comparison
            between subject and the industry average financial index.
            Weight 10%-30% in the comprehensive analysis.` },
            {
                type: 'Company Character',
                description: `Referring to subject’s character that can be
            affected by the transaction records, judicial
            records, administrative supervision information,
            tax records, operation status etc. Weight 20%-25%
            in th7e comprehensive analysis.` },
            {
                type: 'Management Competence',
                description: `Including subject’s shareholder background and
            strength, related company background and
            strength, management experience etc. Weight
            20%-25% in the comprehensive analysis.` },
            {
                type: 'Operation Capacity',
                description: `Analysis on subject’s current operation condition
            including the products, history, staff scale,
            intellectual property, business size etc. Weight
            20%-25% in the comprehensive analysis.` },
            {
                type: 'External Background',
                description: `Analysis on the external factors that may have
            effect on subject, including the industry
            background, location background, competitors etc.
            Weight 10%-15% in the comprehensive analysis.` }
        ];
    }


    //END

    //RiskLevel
    getRiskLevelList() {
        this.loader.show();
        this.riskLevelService.getList().subscribe({
            next: (data) => {
                this.riskLevelList = data.data;
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
    //END

    //SummaryOpinion
    getSummaryOpinionList(companyInfoId: number) {
        this.loader.show();
        this.summaryOpinionService.getList(companyInfoId).subscribe({
            next: (data) => {
                this.summaryOpinionList = data.data;
            },
            complete: () => {
                this.summaryOpinionList.forEach(obj => {
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

    makeMarginSummaryOpinion() {
        return { 'margin-bottom': '5%' };
    }
    //END

    //CountryRiskAssessment
    getCountryRiskAssessmentList(countryName: string) {
        this.loader.show();
        this.countryService.getRiskAssessmentByCountry(countryName).subscribe({
            next: (data) => {
                this.countryRiskAssessment = data.data;
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

    makeMarginCountryRiskAssessment() {
        return { 'margin-bottom': '0%' };
    }
    //END

    //Rating
    getRatingList() {
        this.loader.show();
        this.ratingService.getList().subscribe({
            next: (data) => {
                this.ratingList = data.data;
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

    setColorCode(colorCode: string) {
        let color = "#" + colorCode; //'#ffc107'
        return { 'background-color': color };
    }

    getRateRange(startRange: any, endRange: any) {

        if (startRange < 0) {
            return '---';
        } else {
            return startRange + '-' + endRange;
        }

    }
    //END

    //Common 
    makeNewLine() {
        return "<br /><br /><br /><br /><br /><br />";
    }

    makeMargin() {
        return { 'margin-bottom': '15%' };
    }

    getCapitalize(sentence: string) {
        return sentence.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    }

    //END

}
