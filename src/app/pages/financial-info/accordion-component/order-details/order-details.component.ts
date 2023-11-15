import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompanyInfo } from 'src/app/models/financial-info/company-info.model';
import { OrderDetail } from 'src/app/models/financial-info/order-detail.model';
import { ConfirmationModalService } from 'src/app/services/confirmation-modal/confirmation-modal.service';
import { OrderDetailService } from 'src/app/services/financial-info/order-detail.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { StoredProcedureExecuteService } from 'src/app/services/stored-procedure-execute.service';

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
    templateBtnShow: boolean = false;

    constructor(
        private router: Router,
        private loader: NgxSpinnerService,
        private notifyService: NotificationService,
        private sharedService: SharedService,
        private orderDetailService: OrderDetailService,
        private storedProcedureExecuteService: StoredProcedureExecuteService,
        private confirmationModalService: ConfirmationModalService
    ) {
        this.companyInfo = new CompanyInfo();
    }

    ngOnInit(): void {
        this.title = 'Order Details';

        this.companyInfo = this.sharedService.getCompanyInfoObject();
        this.getOrderDetailList();
    }


    getOrderDetailList() {
        this.loader.show();
        this.orderDetailService.getList(this.companyInfo.id).subscribe({
            next: (data) => {
                this.orderDetailList = data.data;
            },
            complete: () => {
                this.orderDetailList.forEach(obj => {
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
        if (this.orderDetailList.length == 0
            && this.companyInfo.id > 0) {
            this.templateBtnShow = true;
        }
    }

    addTemplate() {
        let templateName = 'order_detail';
        this.storedProcedureExecuteService.execute(templateName, this.companyInfo.id).subscribe({
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

    onDelete(id: any) {
        this.confirmationModalService
            .confirm("Delete confirmation!", "Are you sure you want to delete?")
            .subscribe((answer) => {
                if (answer === "yes") {
                    this.orderDetailService.delete(id).subscribe({
                        next: () => {
                            this.notifyService.showSuccess(
                                "success",
                                "Deleted Successfully."
                            );

                            this.router.navigate(["admin/financial-info"]);
                        },
                        complete: () => {
                            this.getOrderDetailList();
                            this.loader.hide();
                        },
                        error: (err) => {
                            this.notifyService.showError("error", err.message);
                            console.log(err);
                        },
                    });
                } else {
                    return;
                }
            });
    }

    onEdit(orderDetailObj: OrderDetail) {
        this.oldOrderDetailObj = orderDetailObj;
        this.orderDetailList.forEach(obj => {
            obj.isEdit = false;
        });
        orderDetailObj.isEdit = true;

    }

    // onDelete(orderDetailObj: OrderDetail) {
    //     this.orderDetailList.splice(this.orderDetailList.findIndex(e => e.id === orderDetailObj.id), 1);
    // }

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
