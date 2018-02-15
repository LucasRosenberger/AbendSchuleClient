import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import {MatButtonModule, MatCheckboxModule, MatListModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';


import { AppLoginComponent } from './app-login/app-login.component';
import { RouterModule, Routes, RouterLink } from '@angular/router';
import { AppUserComponent } from './app-user/app-user.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';
import { AppFachComponent } from './app-fach/app-fach.component';
import * as $ from 'jquery';
import { AppAdminComponent } from './app-admin/app-admin.component';

const appRoutes : Routes = [
  {
    path: '', 
    redirectTo: 'login', 
    pathMatch:'full'
  },
  {
    path: 'user/:id',
    component: AppUserComponent,
  },
  {
    path: 'admin/:id',
    component: AppAdminComponent,
  },
  {
    path: 'login',
    component: AppLoginComponent,
  },
  {
    path: '**', 
    redirectTo: 'login'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AppLoginComponent,
    AppUserComponent,
    AppFachComponent,
    AppAdminComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule, 
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSelectModule,
    MatCardModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatIconModule,
    MatListModule,
    MatSlideToggleModule,
    RouterModule.forRoot(appRoutes,
      { enableTracing: true }
    ),
    HttpClientModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
