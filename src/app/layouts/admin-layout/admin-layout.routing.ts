import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { AdminLayoutComponent } from './admin-layout.component';
import { OrganizationComponent } from 'src/app/pages/organization/organization.component';
import { FeatureComponent } from 'src/app/pages/permission/feature/feature.component';
import { RolesComponent } from 'src/app/pages/permission/roles/roles.component';
import { RoleFeatureMappingComponent } from 'src/app/pages/permission/role-feature-mapping/role-feature-mapping.component';
import { MenuComponent } from 'src/app/pages/permission/menu/menu.component';
import { FinancialInfoComponent } from 'src/app/pages/financial-info/financial-info.component';
import { CompanyListComponent } from 'src/app/pages/financial-info/company-list/company-list.component';
import { CompanyInfo } from 'src/app/models/financial-info/company-info.model';
import { MainReportComponent } from 'src/app/pages/financial-info/report/main-report/main-report.component';
import { CurrencyDailyRateComponent } from 'src/app/pages/financial-info/currency-daily-rate/currency-daily-rate.component';

export const AdminLayoutRoutes: Routes = [
    {
        path: '', component: AdminLayoutComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'user-profile', component: UserProfileComponent },
            { path: 'role', component: RolesComponent },
            { path: 'menu', component: MenuComponent },
            { path: 'feature', component: FeatureComponent },
            { path: 'feature-map', component: RoleFeatureMappingComponent },
            { path: 'organization', component: OrganizationComponent },
            {
                path: 'financial-info', component: FinancialInfoComponent,
                children: [{ path: 'company-info', component: CompanyInfo }]
            },
            { path: 'company-list', component: CompanyListComponent },
            { path: 'main-report', component: MainReportComponent },
            { path: 'currency-daily-rate', component: CurrencyDailyRateComponent }
        ]
    }
];
