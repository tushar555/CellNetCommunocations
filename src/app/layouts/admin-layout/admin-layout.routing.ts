import { Routes } from '@angular/router';
import { AdminLayoutComponent } from '../admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmpDashboardComponent } from './emp-dashboard/emp-dashboard.component'
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { PageNotFoundComponent } from '../../page-not-found/page-not-found.component';
import { AuthGuard } from '../../authguard/auth.guard'
import { UploadComponent } from '../admin-layout/upload/upload.component';
import { ViewDataComponent } from '../admin-layout/view-data/view-data.component'
import { EmpDetailsComponent } from "app/layouts/admin-layout/emp-details/emp-details.component";

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: 'admin-dashboard',
                canActivateChild: [AuthGuard],
                component: DashboardComponent,
                data: { roles: ['admin'] }
            },
            {
                path: 'emp-dashboard',
                canActivateChild: [AuthGuard],
                component: EmpDashboardComponent,
                data: { roles: ['employee'] }
            },
            {
                path: 'emp-details',
                canActivateChild: [AuthGuard],
                component: EmpDetailsComponent,
                data: { roles: ['employee'] }
            },
            {
                path: 'user-profile',
                canActivateChild: [AuthGuard],
                component: UserProfileComponent,
                data: { roles: ['admin'] }
            },
            {
                path: 'table-list',
                canActivateChild: [AuthGuard],
                component: TableListComponent,
                data: { roles: ['admin'] }
            },
            {
                path: 'typography',
                canActivateChild: [AuthGuard],
                component: TypographyComponent,
                data: { roles: ['admin'] }
            },
            {
                path: 'icons',
                canActivateChild: [AuthGuard],
                component: IconsComponent,
                data: { roles: ['admin'] }
            },
            {
                path: 'maps',
                canActivateChild: [AuthGuard],
                component: MapsComponent,
                data: { roles: ['employee'] }
            },
            {
                path: 'upload-csv',
                canActivateChild: [AuthGuard],
                component: UploadComponent,
                data: { roles: ['admin'] }

            },
            {
                path: 'view-data',
                canActivateChild: [AuthGuard],
                component: ViewDataComponent,
                data: { roles: ['admin'] }
            },
            {
                path: 'upgrade',
                canActivateChild: [AuthGuard],
                component: UpgradeComponent,
                data: { roles: ['employee'] }

            },
            {
                path: 'upgrade',
                canActivateChild: [AuthGuard],
                component: UpgradeComponent,
                data: { roles: ['employee'] }

            }
            // {
            //     path: '**', component: "PageNotFoundComponent"
            // }
        ]

    }

];
