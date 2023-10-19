import { CompanyInfo } from "./company-info.model";

export class RegistrationDetail {
    id: number;
    version: number;

    companyInfo: CompanyInfo;
    item: string;
    subItem: string;
    itemValue: string    
    isRowSpan: boolean;
    isColSpan: boolean;
    sequence: number;

    isEdit: boolean;

    createdBy: number;
    updatedBy: number;
    updatedAt: Date;
    createdAt: Date;
}
