import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    constructor(
        public datePipe: DatePipe,
    ) { }


    validateAllFormFields(formGroup: FormGroup) {
        let invalidFieldCount = 0;
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            const el = document.getElementById(field);

            if (control instanceof FormControl && el && (control?.value == null
                || control?.value === undefined || control?.value == '') && control?.status == "INVALID") {
                control.markAsTouched({ onlySelf: true });
                invalidFieldCount++;
            } else if (control instanceof FormGroup) {
                control.clearValidators();
                control.markAsPristine();
            }
        });

        return invalidFieldCount;
    }

    dateFormat(dateObj: any, format: string): string {
        let newDate;
        let date: Date;
        if (typeof dateObj === 'string') {
            if (dateObj == '') {
                return '';
            }
            var parts = (dateObj.split('T')[0]).split('-');
            var dmy;
            if (parts[0].length == 4) {
                dmy = parts[0] + '-' + parts[1] + '-' + parts[2];
            }
            else {
                dmy = parts[2] + '-' + parts[1] + '-' + parts[0];
            }
            if (dateObj.includes('T')) {
                newDate = this.datePipe.transform(new Date(dateObj), format) || '';
            } else {
                date = new Date(dmy);
                newDate = this.datePipe.transform(new Date(date), format) || '';
            }
        } else if (typeof dateObj === 'object') {
            newDate = this.datePipe.transform(dateObj, format) || '';
        } else {
            newDate = ''
        }
        return newDate
    }

    getMonthNameAndYear(dateObj: any): string {

        let _date = new Date(dateObj); // yyyy-mm-dd
        // Getting full month name (e.g. "June")
        let month = _date.toLocaleString('default', { month: 'long' });
        let year = dateObj.substring(0, 4);

        return month + ' ' + year;
    }

    getYear(dateObj: any): string {
        return dateObj.substring(0, 4);
    }

    getCamelAndFirstCharCap(sentence: string): string {
        const words = sentence.split(" ");

        return words.map((word) => {
            return word[0].toUpperCase() + word.substring(1);
        }).join(" ");

    }
}
