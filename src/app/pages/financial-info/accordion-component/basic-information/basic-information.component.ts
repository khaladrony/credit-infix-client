import { Component, OnInit } from '@angular/core';
import { BasicInfo } from 'src/app/models/financial-info/basic-info.model';

@Component({
  selector: 'app-basic-information',
  templateUrl: './basic-information.component.html',
  styleUrls: ['./basic-information.component.scss']
})
export class BasicInformationComponent implements OnInit {

  title: string;
  basicInfoList: BasicInfo[] = [];
  oldBasicInfoObj: BasicInfo;
  basicInfoNewObj: BasicInfo;  

  constructor() { }

  ngOnInit(): void {
    this.title='Basic Information';
    this.getBasicInfoList();
  }


  getBasicInfoList() {
    let basicInfoObj = new BasicInfo();
    basicInfoObj.item='Name'
    this.basicInfoList.push(basicInfoObj);
    basicInfoObj = new BasicInfo();
    basicInfoObj.item='Established'
    this.basicInfoList.push(basicInfoObj);
    basicInfoObj = new BasicInfo();
    basicInfoObj.item='Legal Address'
    this.basicInfoList.push(basicInfoObj);
    basicInfoObj = new BasicInfo();
    basicInfoObj.item='Operation Address'
    this.basicInfoList.push(basicInfoObj);
}

onEdit(basicInfoObj: BasicInfo) {
    this.oldBasicInfoObj = basicInfoObj;
    this.basicInfoList.forEach(obj => {
        obj.isEdit = false;
    });
    basicInfoObj.isEdit = true;

}

onDelete(basicInfoObj: BasicInfo) {
    this.basicInfoList.splice(this.basicInfoList.findIndex(e => e.item === basicInfoObj.item),1);
}

onAdd() {
    this.oldBasicInfoObj = null;

    this.basicInfoNewObj = new BasicInfo();
    this.basicInfoNewObj.item='';
    this.basicInfoNewObj.description='';
    this.basicInfoNewObj.isEdit=true;

    this.basicInfoList.push(this.basicInfoNewObj);
}

onUpdate(basicInfoObj: BasicInfo) {
    console.log(basicInfoObj);
    basicInfoObj.isEdit = false;
}

onCancel(basicInfoObj: BasicInfo) {
    if (this.oldBasicInfoObj == undefined || this.oldBasicInfoObj == null) {
        basicInfoObj.isEdit = true;
        this.basicInfoList.splice(this.basicInfoList.findIndex(e => e.item === basicInfoObj.item),1);
    } else {
       
        basicInfoObj.item = this.oldBasicInfoObj.item;
        basicInfoObj.description = this.oldBasicInfoObj.description;
        basicInfoObj.isEdit = false;
    }

}

onSave(){
    this.basicInfoList.forEach(obj => {
        obj.isEdit = false;
    });
    console.log(this.basicInfoList);
}

validateField(item: any) {
    if (item !== '') {
        return false;
    } else {
        return true;
    }

}

validateForm(basicInfoObj: BasicInfo) {
    if (basicInfoObj.item !== '' && basicInfoObj.description !== '') {
        return false;
    } else {
        return true;
    }
}
}
