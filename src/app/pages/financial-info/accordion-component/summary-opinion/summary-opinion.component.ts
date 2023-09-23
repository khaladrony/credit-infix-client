import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary-opinion',
  templateUrl: './summary-opinion.component.html',
  styleUrls: ['./summary-opinion.component.scss']
})
export class SummaryOpinionComponent implements OnInit {
  title:string;

  constructor() { }

  ngOnInit(): void {
    this.title='Summary Opinion';
  }

}
