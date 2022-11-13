import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { TenantComponent } from './tenant/tenant.component';
import {AuthGuard} from "./guard/auth.guard";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { CreateTenantComponentComponent } from './modals/create-tenant-component/create-tenant-component.component';
import {MatDialogModule} from "@angular/material/dialog";
import {NgSelectModule} from "ng-custom-select";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  exports: [
    MatDialogModule,
  ]
})
export class MaterialModule {}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    TenantComponent,
    CreateTenantComponentComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [authInterceptorProviders , AuthGuard],
  entryComponents: [CreateTenantComponentComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
