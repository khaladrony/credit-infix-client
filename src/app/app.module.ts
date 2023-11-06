import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NotifierModule } from 'angular-notifier';
import { NgSelectModule } from '@ng-select/ng-select';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { EnvServiceProvider } from './services/env.service.provider';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    NgbAlertModule,
    NgbPaginationModule,
    ModalModule.forRoot(),
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    NgSelectModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'middle',
          distance: 20
        },
        vertical: {
          position: 'bottom',
          distance: 350,
          gap: 10
        }
      },
      behaviour: {
        autoHide: 10000
      }
    }),
    PDFExportModule,
    BsDatepickerModule.forRoot(),
    NgbDatepickerModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    NotFoundComponent
  ],
  providers: [
    EnvServiceProvider,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
