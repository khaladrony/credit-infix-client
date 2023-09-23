import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent implements OnInit {

  title:string;

  constructor() { }

  ngOnInit(): void {
    this.title='Company Info';
  }

}
