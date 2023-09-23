import { Component, OnInit } from '@angular/core';
import { CorporateStructure } from 'src/app/models/financial-info/corporate-structure.model';

@Component({
    selector: 'app-corporate-structure',
    templateUrl: './corporate-structure.component.html',
    styleUrls: ['./corporate-structure.component.scss']
})
export class CorporateStructureComponent implements OnInit {

    title: string;
    corporateStructureList: CorporateStructure[] = [];
    oldCorporateStructureObj: CorporateStructure;
    newCorporateStructureObj: CorporateStructure;

    constructor() { }

    ngOnInit(): void {
        this.title = 'Corporate Structure';

        this.getCorporateStructureList();
    }

    getCorporateStructureList() {
        let corporateStructureObj = new CorporateStructure();
        corporateStructureObj.id = this.getId();
        corporateStructureObj.itemCode = 'Number of Employee:';
        corporateStructureObj.itemValue = '1,000+';
        this.corporateStructureList.push(corporateStructureObj);

        corporateStructureObj = new CorporateStructure();
        corporateStructureObj.id = this.getId();
        corporateStructureObj.itemCode = 'Listed Status:';
        corporateStructureObj.itemValue = 'Not Listed';
        this.corporateStructureList.push(corporateStructureObj);

        corporateStructureObj = new CorporateStructure();
        corporateStructureObj.id = this.getId();
        corporateStructureObj.itemCode = 'Stock Code:';
        corporateStructureObj.itemValue = 'NA';
        this.corporateStructureList.push(corporateStructureObj);

        corporateStructureObj = new CorporateStructure();
        corporateStructureObj.id = this.getId();
        corporateStructureObj.itemCode = 'Stock Exchange :';
        corporateStructureObj.itemValue = 'NA';
        this.corporateStructureList.push(corporateStructureObj);

        corporateStructureObj = new CorporateStructure();
        corporateStructureObj.id = this.getId();
        corporateStructureObj.itemCode = 'Holding Company:';
        corporateStructureObj.itemValue = 'Sterling Apparel Limited\n'
        'Address: No. 18–20/F, Win Plaza, 9 Sheung Hai Street, San Po Kong, Hong Kong\n'
        'Factory: Zhi Wei (Guangzhou) Garment Co., Limited\n'
        'Address: 2/F, Block A, Heyu Industrial Park, Chao Tian Industrial Zone,\n'
        'Song Shan Road, Shi Lou Town, Panyu City, Guangdong, P.R.C.';
        this.corporateStructureList.push(corporateStructureObj);

        corporateStructureObj = new CorporateStructure();
        corporateStructureObj.id = this.getId();
        corporateStructureObj.itemCode = 'Sister Concern:';
        corporateStructureObj.itemValue = '●Sterling Group Holdings Limited\n'
        '●Chiefway International Limited\n'
        '●Chiefway (Private) Limited';
        this.corporateStructureList.push(corporateStructureObj);



    }

    onEdit(corporateStructureObj: CorporateStructure) {
        this.oldCorporateStructureObj = corporateStructureObj;
        this.corporateStructureList.forEach(obj => {
            obj.isEdit = false;
        });
        corporateStructureObj.isEdit = true;

    }

    onDelete(corporateStructureObj: CorporateStructure) {
        this.corporateStructureList.splice(this.corporateStructureList.findIndex(e => e.id === corporateStructureObj.id), 1);
    }

    onAdd() {
        this.oldCorporateStructureObj = null;

        this.newCorporateStructureObj = new CorporateStructure();
        this.newCorporateStructureObj.id = this.getId();
        this.newCorporateStructureObj.itemCode = '';
        this.newCorporateStructureObj.itemValue = '';
        this.newCorporateStructureObj.isEdit = true;
        this.corporateStructureList.push(this.newCorporateStructureObj);



    }

    onUpdate(corporateStructureObj: CorporateStructure) {
        console.log(corporateStructureObj);
        corporateStructureObj.isEdit = false;
    }

    onCancel(corporateStructureObj: CorporateStructure) {
        if (this.oldCorporateStructureObj == undefined || this.oldCorporateStructureObj == null) {
            corporateStructureObj.isEdit = true;
            this.corporateStructureList.splice(this.corporateStructureList.findIndex(e => e.id === corporateStructureObj.id), 1);
        } else {

            corporateStructureObj.itemCode = this.oldCorporateStructureObj.itemCode;
            corporateStructureObj.itemValue = this.oldCorporateStructureObj.itemValue;
            corporateStructureObj.isEdit = false;
        }

    }

    onSave() {
        this.corporateStructureList.forEach(obj => {
            obj.isEdit = false;
        });
        console.log(this.corporateStructureList);
    }

    validateField(item: any) {
        if (item !== '') {
            return false;
        } else {
            return true;
        }

    }

    validateForm(corporateStructureObj: CorporateStructure) {
        if (corporateStructureObj.itemCode !== '' && corporateStructureObj.itemValue !== '') {
            return false;
        } else {
            return true;
        }
    }

    getId() {
        if (this.corporateStructureList.length == 0) {
            return 1;
        } else {
            let lastCorporateStructureObj: CorporateStructure = this.corporateStructureList[this.corporateStructureList.length - 1];
            return lastCorporateStructureObj.id + 1;
        }
    }
}
