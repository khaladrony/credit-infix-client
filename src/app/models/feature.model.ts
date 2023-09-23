import { Menu } from "./menu.model";

export class Feature {
    id: number;
    version: number;

    name: string;
    path: string;
    icon: string;
    type: string;   //link,submenu
    isCollapsed: boolean;
    menu:Menu;
    status:string;

    createdBy: number;
    updatedBy: number;
    updatedAt: Date;
    createdAt: Date;
}
