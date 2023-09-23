import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-inline-table',
    templateUrl: './inline-table.component.html',
    styleUrls: ['./inline-table.component.scss']
})
export class InlineTableComponent implements OnInit {

    public finSummaryForm: FormGroup;
    cityList: any;


    constructor(private fb: FormBuilder) {

        this.finSummaryForm = this.fb.group({
            tableRows: this.fb.array([])
        });
        this.addRow();

    }

    ngOnInit(): void {
        this.cityList = [
            { name: 'Dhaka', code: 'DH' },
            { name: 'Chittagong', code: 'CTG' },
            { name: 'Khulna', code: 'KH' }
        ]
    }

    createFormGroup(): FormGroup {
        return this.fb.group({
            firstname: [''],
            lastname: [''],
            city: [''],
            state: [''],
            status: [''],
            isEdit: [true]
        })
    }

    get getFormControls() {
        const control = this.finSummaryForm.get('tableRows') as FormArray;
        return control;
    }

    addRow() {
        const control = this.finSummaryForm.get('tableRows') as FormArray;
        control.push(this.createFormGroup());
    }

    onCityChange(event: any, index: number) {
        const control = this.finSummaryForm.get('tableRows') as FormArray;
    }

    onSave() { }

    onEdit(index: number) {
        const control = this.finSummaryForm.get('tableRows') as FormArray;
        console.log(control);

    }

    onDelete(index: number) {
        const control = this.finSummaryForm.get('tableRows') as FormArray;
        control.removeAt(index);
    }

    onUpdate(index: number) {
        const control = this.finSummaryForm.get('tableRows') as FormArray;
        console.log(control);
        control.controls[index].get('isEdit').setValue(false);
    }

    onCancel() {

    }

}
