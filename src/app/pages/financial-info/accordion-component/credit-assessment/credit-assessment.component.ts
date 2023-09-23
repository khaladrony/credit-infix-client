import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-credit-assessment',
  templateUrl: './credit-assessment.component.html',
  styleUrls: ['./credit-assessment.component.scss']
})
export class CreditAssessmentComponent implements OnInit {
  title:string;

  constructor() { }

  ngOnInit(): void {
    this.title='Credit Assessment';
  }

  getPercentage(value: number) {
    switch (value) {
        case 1:
            return '30%';
        case 2:
            return '70%';
        case 3:
            return '70%';
    }
}
}
