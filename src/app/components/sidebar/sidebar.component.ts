import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-store';
import { CommonService } from '../../service/common.service';
import { Constant } from '../../../assets/data/constant'
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'User Profile', icon: 'person', class: '' },
    { path: '/table-list', title: 'Table List', icon: 'content_paste', class: '' },
    { path: '/typography', title: 'Typography', icon: 'library_books', class: '' },
    { path: '/icons', title: 'Icons', icon: 'bubble_chart', class: '' },
    { path: '/maps', title: 'Maps', icon: 'location_on', class: '' },
    { path: '/notifications', title: 'Notifications', icon: 'notifications', class: '' },
    { path: '/upgrade', title: 'Upgrade to PRO', icon: 'unarchive', class: 'active-pro' },
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    EmpName: any;
    EmpType: any;
    menuItems: any[];

    constructor(public auth: AuthService, public router: Router, public localstorage: LocalStorageService, public common: CommonService) { }

    ngOnInit() {
        this.EmpType = this.localstorage.get('userDetails').role;
        this.EmpName = this.localstorage.get('userDetails').full_name;
        //console.log('EmpType', this.localstorage.get('userDetails').EmpType);

        //  this.menuItems = ROUTES.filter(menuItem => menuItem);
        let URL = Constant.sidemenu;
        console.log('URL', URL);

        this.common.getData(URL).subscribe((response: any) => {
            console.log('RESP', response);

            if (this.EmpType === 'admin') {
                this.menuItems = response.adminsidemenu
            } else if(this.EmpType === 'teamleader'){
                this.menuItems = response.teamleadersidemenu
            }else{
                this.menuItems = response.otherempsidemenu
            }
        })
    }
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    gotoLink(menuItem) {
        if (menuItem.title === 'Logout') {
            this.auth.doLogout();
            this.router.navigate(['/login']);
            this.common.showSnackbar({ 'status': 'Logged out Successfully!' })
        } else if(menuItem.path === ''){
            this.common.showSnackbar({ 'status': 'Comming Soon!' })
        }else{
            this.router.navigate([menuItem.path]);
        }
        // else if (menuItem.title === 'Add/Delete Employee') {
        //  this.common.showSnackbar({ 'status': 'Coming soon' })
        //}

    }
}
