import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrganizationComponent } from 'src/app/pages/organization/organization.component';
import { FeatureComponent } from 'src/app/pages/permission/feature/feature.component';
import { RolesComponent } from 'src/app/pages/permission/roles/roles.component';
import { RoleFeatureMappingComponent } from 'src/app/pages/permission/role-feature-mapping/role-feature-mapping.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MenuComponent } from 'src/app/pages/permission/menu/menu.component';
import { FinancialInfoComponent } from 'src/app/pages/financial-info/financial-info.component';
import { BasicInformationComponent } from 'src/app/pages/financial-info/accordion-component/basic-information/basic-information.component';
import { CompanyInfoComponent } from 'src/app/pages/financial-info/accordion-component/company-info/company-info.component';
import { ContactsComponent } from 'src/app/pages/financial-info/accordion-component/contacts/contacts.component';
import { CreditAssessmentComponent } from 'src/app/pages/financial-info/accordion-component/credit-assessment/credit-assessment.component';
import { FinancialSummaryComponent } from 'src/app/pages/financial-info/accordion-component/financial-summary/financial-summary.component';
import { RiskProfileComponent } from 'src/app/pages/financial-info/accordion-component/risk-profile/risk-profile.component';
import { OrderDetailsComponent } from 'src/app/pages/financial-info/accordion-component/order-details/order-details.component';
import { LocationComponent } from 'src/app/pages/financial-info/accordion-component/location/location.component';
import { RegistrationDetailsComponent } from 'src/app/pages/financial-info/accordion-component/registration-details/registration-details.component';
import { ManagementComponent } from 'src/app/pages/financial-info/accordion-component/management/management.component';
import { ShareholderComponent } from 'src/app/pages/financial-info/accordion-component/shareholder/shareholder.component';
import { OperationInformationComponent } from 'src/app/pages/financial-info/accordion-component/operation-information/operation-information.component';
import { NatureOfBusinessComponent } from 'src/app/pages/financial-info/accordion-component/nature-of-business/nature-of-business.component';
import { CorporateStructureComponent } from 'src/app/pages/financial-info/accordion-component/corporate-structure/corporate-structure.component';
import { FinancialInformationComponent } from 'src/app/pages/financial-info/accordion-component/financial-information/financial-information.component';
import { InfixCreditInformationComponent } from 'src/app/pages/financial-info/accordion-component/infix-credit-information/infix-credit-information.component';
import { SummaryOpinionComponent } from 'src/app/pages/financial-info/accordion-component/summary-opinion/summary-opinion.component';
import { CountryRiskComponent } from 'src/app/pages/financial-info/accordion-component/country-risk/country-risk.component';
import { InfixRatingGlossaryComponent } from 'src/app/pages/financial-info/accordion-component/infix-rating-glossary/infix-rating-glossary.component';
import { InlineTableComponent } from 'src/app/pages/financial-info/accordion-component/inline-table/inline-table.component';
import { CompanyListComponent } from 'src/app/pages/financial-info/company-list/company-list.component';
import { MainReportComponent } from 'src/app/pages/financial-info/report/main-report/main-report.component';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { CurrencyDailyRateComponent } from 'src/app/pages/financial-info/currency-daily-rate/currency-daily-rate.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { BankersComponent } from 'src/app/pages/financial-info/accordion-component/bankers/bankers.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ReactiveFormsModule,
    NgSelectModule,
    PDFExportModule,
    BsDatepickerModule.forRoot(),
    NgbDatepickerModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    OrganizationComponent,
    RolesComponent,
    MenuComponent,
    FeatureComponent,
    RoleFeatureMappingComponent,
    FinancialInfoComponent,
    CompanyInfoComponent,
    CreditAssessmentComponent,
    FinancialSummaryComponent,
    RiskProfileComponent,
    OrderDetailsComponent,
    ContactsComponent,    
    BasicInformationComponent,    
    LocationComponent,
    RegistrationDetailsComponent,
    ManagementComponent,
    ShareholderComponent,
    OperationInformationComponent,
    NatureOfBusinessComponent,
    CorporateStructureComponent,
    FinancialInformationComponent,
    InfixCreditInformationComponent,
    SummaryOpinionComponent,
    CountryRiskComponent,
    InfixRatingGlossaryComponent,
    InlineTableComponent,
    CompanyListComponent,
    MainReportComponent,
    CurrencyDailyRateComponent,
    BankersComponent
    
  ]
})

export class AdminLayoutModule {}
