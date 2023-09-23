import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-risk-profile',
    templateUrl: './risk-profile.component.html',
    styleUrls: ['./risk-profile.component.scss']
})
export class RiskProfileComponent implements OnInit {

    title: string;


    constructor() { }

    ngOnInit(): void {
        this.title = 'Risk Profile';
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
