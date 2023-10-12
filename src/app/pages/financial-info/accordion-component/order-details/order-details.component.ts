import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompanyInfo } from 'src/app/models/financial-info/company-info.model';
import { OrderDetail } from 'src/app/models/financial-info/order-detail.model';
import { OrderDetailService } from 'src/app/services/financial-info/order-detail.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

    title: string;
    orderDetailList: OrderDetail[] = [];
    oldOrderDetailObj: OrderDetail;
    orderDetailNewObj: OrderDetail;
    companyInfo: CompanyInfo;

    constructor(
        private router: Router,
        private loader: NgxSpinnerService,
        private notifyService: NotificationService,
        private sharedService: SharedService,
        private orderDetailService: OrderDetailService
    ) {
        this.companyInfo = new CompanyInfo();
     }

    ngOnInit(): void {
        this.title = 'Order Details';

        this.companyInfo = this.sharedService.getCompanyInfoObject();
        this.getOrderDetailList();
    }


    getOrderDetailList() {
        // let orderDetailObj = new OrderDetail();
        // orderDetailObj.id = this.getId();
        // orderDetailObj.itemCode = 'Name Given:';
        // orderDetailObj.itemValue = 'Chiefway Katunayake (Pvt) Limited';
        // this.orderDetailList.push(orderDetailObj);

        // orderDetailObj = new OrderDetail();
        // orderDetailObj.id = this.getId();
        // orderDetailObj.itemCode = 'Address Given:';
        // orderDetailObj.itemValue = 'Ring Road 3, Phase II. E.P.Z. Katunayake. 11450. Sri Lanka, Katunayake 10500, Sri Lanka';
        // this.orderDetailList.push(orderDetailObj);

        // orderDetailObj = new OrderDetail();
        // orderDetailObj.id = this.getId();
        // orderDetailObj.itemCode = 'Tel No Given:';
        // orderDetailObj.itemValue = 'Nil';
        // this.orderDetailList.push(orderDetailObj);

        // orderDetailObj = new OrderDetail();
        // orderDetailObj.id = this.getId();
        // orderDetailObj.itemCode = 'Website address:';
        // orderDetailObj.itemValue = 'Nil';
        // this.orderDetailList.push(orderDetailObj);

        // orderDetailObj = new OrderDetail();
        // orderDetailObj.id = this.getId();
        // orderDetailObj.itemCode = 'Fax No Given:';
        // orderDetailObj.itemValue = 'Nil';
        // this.orderDetailList.push(orderDetailObj);

        // orderDetailObj = new OrderDetail();
        // orderDetailObj.id = this.getId();
        // orderDetailObj.itemCode = 'Other Details:';
        // orderDetailObj.itemValue = 'Date of Incorporation: 31/03/2017, Company No.: PV 121177';
        // this.orderDetailList.push(orderDetailObj);

        // orderDetailObj = new OrderDetail();
        // orderDetailObj.id = this.getId();
        // orderDetailObj.itemCode = 'Investigation Record:';
        // orderDetailObj.itemValue = `Interviewee: Mr. Tharushi; Job Title: Human Resources & Administration
        // Officer Tel: +94 112252542; Investigation Way: Telephone Interview`;
        // this.orderDetailList.push(orderDetailObj);

        // orderDetailObj = new OrderDetail();
        // orderDetailObj.id = this.getId();
        // orderDetailObj.itemCode = 'Investigation Note:';
        // orderDetailObj.itemValue = `The SBE’s inquiry name is inaccurate and Reg. Number, date of incorporation
        // with address is accurate.`;
        // this.orderDetailList.push(orderDetailObj);


        this.loader.show();
        this.orderDetailService.getList(this.companyInfo.id).subscribe({
            next: (data) => {
                this.orderDetailList = data.data;
            },
            complete: () => {
                this.orderDetailList.forEach(obj => {
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

    onEdit(orderDetailObj: OrderDetail) {
        this.oldOrderDetailObj = orderDetailObj;
        this.orderDetailList.forEach(obj => {
            obj.isEdit = false;
        });
        orderDetailObj.isEdit = true;

    }

    onDelete(orderDetailObj: OrderDetail) {
        this.orderDetailList.splice(this.orderDetailList.findIndex(e => e.id === orderDetailObj.id), 1);
    }

    onAdd() {
        this.oldOrderDetailObj = null;

        this.orderDetailNewObj = new OrderDetail();
        this.orderDetailNewObj.itemCode = '';
        this.orderDetailNewObj.itemValue = '';
        this.orderDetailNewObj.isEdit = true;

        this.orderDetailList.push(this.orderDetailNewObj);
    }

    onUpdate(orderDetailObj: OrderDetail) {
        console.log(orderDetailObj);
        orderDetailObj.isEdit = false;
    }

    onCancel(orderDetailObj: OrderDetail) {
        if (this.oldOrderDetailObj == undefined || this.oldOrderDetailObj == null) {
            orderDetailObj.isEdit = true;
            this.orderDetailList.splice(this.orderDetailList.findIndex(e => e.id === orderDetailObj.id), 1);
        } else {

            orderDetailObj.itemCode = this.oldOrderDetailObj.itemCode;
            orderDetailObj.itemValue = this.oldOrderDetailObj.itemValue;
            orderDetailObj.isEdit = false;
        }

    }

    onSave() {
        this.orderDetailList.forEach(obj => {
            obj.companyInfo = this.companyInfo;
        });

        if (this.orderDetailList.length > 0) {
            this.loader.show();

            this.orderDetailService.save(this.orderDetailList, this.companyInfo.id).subscribe({
                next: (response) => {
                    console.log(response);
                    this.notifyService.showSuccess("success", response.message);

                    this.router.navigate(["admin/financial-info"]);
                },
                complete: () => {
                    this.getOrderDetailList();
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

    validateForm(orderDetailObj: OrderDetail) {
        if (orderDetailObj.itemCode !== '' && orderDetailObj.itemValue !== '') {
            return false;
        } else {
            return true;
        }
    }

    getId() {
        if (this.orderDetailList.length == 0) {
            return 1;
        } else {
            let lastOrderDetailObj: OrderDetail = this.orderDetailList[this.orderDetailList.length - 1];
            return lastOrderDetailObj.id + 1;
        }
    }

}
