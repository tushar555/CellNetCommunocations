import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
  MatSelectModule
} from '@angular/material';
import { ComponentsModule } from '../../components/components.module';
import { AdminLayoutComponent } from './admin-layout.component';
import { EmpDashboardComponent } from './emp-dashboard/emp-dashboard.component';
import { UploadComponent } from "./upload/upload.component";
import { ViewDataComponent } from './view-data/view-data.component';
import { EmpDetailsComponent } from './emp-details/emp-details.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
    ComponentsModule,
    MatSelectModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    AdminLayoutComponent,
    EmpDashboardComponent,
    UploadComponent,
    ViewDataComponent,
    EmpDetailsComponent
  ]
})

export class AdminLayoutModule { }
