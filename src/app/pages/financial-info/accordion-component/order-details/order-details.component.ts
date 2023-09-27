import { Component, OnInit } from '@angular/core';
import { OrderDetail } from 'src/app/models/financial-info/order-detail.model';

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

    constructor() { }

    ngOnInit(): void {
        this.title = 'Order Details';

        this.getOrderDetailList();
    }


    getOrderDetailList() {
        let orderDetailObj = new OrderDetail();
        orderDetailObj.id=this.getId();
        orderDetailObj.item='Name Given';
        orderDetailObj.description='Chiefway Katunayake (Pvt) Limited';

        this.orderDetailList.push(orderDetailObj);
        orderDetailObj = new OrderDetail();
        orderDetailObj.id=this.getId();
        orderDetailObj.item='Address Given';
        orderDetailObj.description='Ring Road 3, Phase II. E.P.Z. Katunayake. 11450. Sri Lanka, Katunayake 10500, Sri Lanka';
        this.orderDetailList.push(orderDetailObj);
    }

    onEdit(orderDetailObj: OrderDetail) {
        this.oldOrderDetailObj = orderDetailObj;
        this.orderDetailList.forEach(obj => {
            obj.isEdit = false;
        });
        orderDetailObj.isEdit = true;

    }

    onDelete(orderDetailObj: OrderDetail) {
        this.orderDetailList.splice(this.orderDetailList.findIndex(e => e.id === orderDetailObj.id),1);
    }

    onAdd() {
        this.oldOrderDetailObj = null;

        this.orderDetailNewObj = new OrderDetail();
        this.orderDetailNewObj.item='';
        this.orderDetailNewObj.description='';
        this.orderDetailNewObj.isEdit=true;

        this.orderDetailList.push(this.orderDetailNewObj);
    }

    onUpdate(orderDetailObj: OrderDetail) {
        console.log(orderDetailObj);
        orderDetailObj.isEdit = false;
    }

    onCancel(orderDetailObj: OrderDetail) {
        if (this.oldOrderDetailObj == undefined || this.oldOrderDetailObj == null) {
            orderDetailObj.isEdit = true;
            this.orderDetailList.splice(this.orderDetailList.findIndex(e => e.id === orderDetailObj.id),1);
        } else {
           
            orderDetailObj.item = this.oldOrderDetailObj.item;
            orderDetailObj.description = this.oldOrderDetailObj.description;
            orderDetailObj.isEdit = false;
        }

    }

    onSave(){
        this.orderDetailList.forEach(obj => {
            obj.isEdit = false;
        });
        console.log(this.orderDetailList);
    }

    validateField(item: any) {
        if (item !== '') {
            return false;
        } else {
            return true;
        }

    }

    validateForm(orderDetailObj: OrderDetail) {
        if (orderDetailObj.item !== '' && orderDetailObj.description !== '') {
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
