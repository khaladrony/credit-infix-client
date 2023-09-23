import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-country-risk',
  templateUrl: './country-risk.component.html',
  styleUrls: ['./country-risk.component.scss']
})
export class CountryRiskComponent implements OnInit {
  title:string;

  constructor() { }

  ngOnInit(): void {
    this.title='Country Risk';
  }

}
