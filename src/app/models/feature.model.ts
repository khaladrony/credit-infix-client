import { Menu } from "./menu.model";

export class Feature {
    id: number;
    version: number;

    name: string;
    path: string;
    icon: string;
    type: string;   //link,''
    isCollapsed: boolean;
    menu: Menu;
    menuType: string;    //Main, Sub
    status: string;

    createdBy: number;
    updatedBy: number;
    updatedAt: Date;
    createdAt: Date;
}
