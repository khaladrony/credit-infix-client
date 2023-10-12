import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-financial-info',
    templateUrl: './financial-info.component.html',
    styleUrls: ['./financial-info.component.scss']
})
export class FinancialInfoComponent implements OnInit {

    public featureList: any[];
    ariaExpanded01: boolean = false;

    constructor(
        public route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        const snapshot = this.route.snapshot;
        console.log(snapshot.component);

        this.route.queryParams.subscribe((params: any) => {
            console.log(params);
            console.log(params.data);
            if (params.type == "1") {
                this.ariaExpanded01 = true;
            }
        })

        this.featureList = [
            { id: 0, name: 'Company Info', selector: '<app-company-info></app-company-info>', cardHeaderId: 'heading-1', href: '#collapse-1', ariaExpanded: this.ariaExpanded01 ? true : false, ariaControls: 'collapse-1', collapseClass: this.ariaExpanded01 ? 'show' : '' },
            { id: 1, name: 'Credit Assessment', selector: '<app-credit-assessment></app-credit-assessment>', cardHeaderId: 'heading-2', href: '#collapse-2', ariaExpanded: false, ariaControls: 'collapse-2', collapseClass: '' },
            { id: 2, name: 'Financial Summary', selector: '<app-financial-summary></app-financial-summary>', cardHeaderId: 'heading-3', href: '#collapse-3', ariaExpanded: false, ariaControls: 'collapse-3', collapseClass: '' },
            { id: 3, name: 'Risk Profile', selector: '<app-risk-profile></app-risk-profile>', cardHeaderId: 'heading-4', href: '#collapse-4', ariaExpanded: false, ariaControls: 'collapse-4', collapseClass: '' },
            { id: 4, name: 'Order Details', selector: '<app-order-details></app-order-details>', cardHeaderId: 'heading-5', href: '#collapse-5', ariaExpanded: false, ariaControls: 'collapse-5', collapseClass: '' },
            { id: 5, name: 'Contacts', selector: '<app-contacts></app-contacts>', cardHeaderId: 'heading-6', href: '#collapse-6', ariaExpanded: false, ariaControls: 'collapse-6', collapseClass: '' },
            { id: 6, name: 'Basic Information', selector: '<app-basic-information></app-basic-information>', cardHeaderId: 'heading-7', href: '#collapse-7', ariaExpanded: false, ariaControls: 'collapse-7', collapseClass: '' },
            { id: 7, name: 'Location', selector: '<app-location></app-location>', cardHeaderId: 'heading-8', href: '#collapse-8', ariaExpanded: false, ariaControls: 'collapse-8', collapseClass: '' },
            { id: 8, name: 'Registration Details', selector: '<app-registration-details></app-registration-details>', cardHeaderId: 'heading-9', href: '#collapse-9', ariaExpanded: false, ariaControls: 'collapse-9', collapseClass: '' },
            { id: 9, name: 'Management', selector: '<app-management></app-management>', cardHeaderId: 'heading-10', href: '#collapse-10', ariaExpanded: false, ariaControls: 'collapse-10', collapseClass: '' },
            { id: 10, name: 'Shareholder', selector: '<app-shareholder></app-shareholder>', cardHeaderId: 'heading-11', href: '#collapse-11', ariaExpanded: false, ariaControls: 'collapse-11', collapseClass: '' },
            { id: 11, name: 'Operation Information', selector: '<app-operation-information></app-operation-information>', cardHeaderId: 'heading-12', href: '#collapse-12', ariaExpanded: false, ariaControls: 'collapse-12', collapseClass: '' },
            { id: 12, name: 'Nature Of Business', selector: '<app-nature-of-business></app-nature-of-business>', cardHeaderId: 'heading-13', href: '#collapse-13', ariaExpanded: false, ariaControls: 'collapse-13', collapseClass: '' },
            { id: 13, name: 'Corporate Structure', selector: '<app-corporate-structure></app-corporate-structure>', cardHeaderId: 'heading-14', href: '#collapse-14', ariaExpanded: false, ariaControls: 'collapse-14', collapseClass: '' },
            { id: 14, name: 'Financial Information', selector: '<app-financial-information></app-financial-information>', cardHeaderId: 'heading-15', href: '#collapse-15', ariaExpanded: false, ariaControls: 'collapse-15', collapseClass: '' },
            { id: 15, name: 'Infix Credit Information', selector: '<app-infix-credit-information></app-infix-credit-information>', cardHeaderId: 'heading-16', href: '#collapse-16', ariaExpanded: false, ariaControls: 'collapse-16', collapseClass: '' },
            { id: 16, name: 'Summary & Opinion', selector: '<app-summary-opinion></app-summary-opinion>', cardHeaderId: 'heading-17', href: '#collapse-17', ariaExpanded: false, ariaControls: 'collapse-17', collapseClass: '' },
            { id: 17, name: 'Country Risk', selector: '<app-country-risk></app-country-risk>', cardHeaderId: 'heading-18', href: '#collapse-18', ariaExpanded: false, ariaControls: 'collapse-18', collapseClass: '' },
            { id: 18, name: 'Infix Rating Glossary', selector: '<app-infix-rating-glossary></app-infix-rating-glossary>', cardHeaderId: 'heading-19', href: '#collapse-19', ariaExpanded: false, ariaControls: 'collapse-19', collapseClass: '' },
            { id: 19, name: 'Inline Table Editing', selector: '<app-inline-table></app-inline-table>', cardHeaderId: 'heading-20', href: '#collapse-20', ariaExpanded: false, ariaControls: 'collapse-20', collapseClass: '' }

        ]

        

    }

    clickedEvent(i: number) {
        this.featureList.forEach(element => {
            if (element.id == i && !element.ariaExpanded) {
                element.ariaExpanded = true;
            } else if (element.id == i && element.ariaExpanded) {
                element.ariaExpanded = false;
            }
        });
    }
}
