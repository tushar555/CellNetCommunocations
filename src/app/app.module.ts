import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { MatDialogModule, MatSelectModule, MatButtonModule, MatRippleModule, MatInputModule, MatTooltipModule } from '@angular/material';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

//import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { AgmCoreModule } from '@agm/core';
import { AuthService } from './service/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { WebStorageModule } from 'ngx-store';
import { CommonService } from './service/common.service';
import { AuthGuard } from './authguard/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
@NgModule({
  imports: [
    WebStorageModule,
    NgxSpinnerModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
    MatDialogModule
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  providers: [AuthService, CommonService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
