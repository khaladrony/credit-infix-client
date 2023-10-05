import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    type: string;
    isCollapsed: boolean;
    children: any;
}
export const ROUTES: RouteInfo[] = [
    {
        path: '/admin/user-profile', title: 'User profile', icon: 'ni-single-02 text-yellow', type: 'submenu', isCollapsed: true,
        children: [
            { path: '/admin/user-profile', title: 'User', type: 'link' },
            { path: '/admin/role', title: 'Roles', type: 'link' },
            { path: '/admin/menu', title: 'Menus', type: 'link' },
            { path: '/admin/feature', title: 'Features', type: 'link' },
            { path: '/admin/feature-map', title: 'Features Mapping', type: 'link' }
        ]
    },
    {
        path: '/admin/financial-info', title: 'Financial Info', icon: 'ni-money-coins text-primary', type: 'link', isCollapsed: false,
        children: []
    },
    {
        path: '/admin/company-list', title: 'Company List', icon: 'fa fa-list-alt text-success', type: 'link', isCollapsed: false,
        children: []
    }
];

export const ALLROUTES: any[] = [
    { path: '/admin/user-profile', title: 'User' },
    { path: '/admin/role', title: 'Roles' },
    { path: '/admin/menu', title: 'Menus' },
    { path: '/admin/feature', title: 'Features' },
    { path: '/admin/feature-map', title: 'Features Mapping' },
    { path: '/admin/organization', title: 'Organization' },
    { path: '/admin/financial-info', title: 'Financial Info' },
    { path: '/admin/company-list', title: 'Company List' }
]

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    public menuItems: any[];
    public isCollapsed = true;

    constructor(private router: Router) { }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.router.events.subscribe((event) => {
            this.isCollapsed = true;
        });
    }
}
