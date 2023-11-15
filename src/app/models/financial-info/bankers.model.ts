import { CompanyInfo } from "./company-info.model";

export class Bankers {
    id: number;
    version: number;

    companyInfo: CompanyInfo;
    itemCode: string;
    itemValue: string;
    sequence: number;
    
    isEdit: boolean;

    createdBy: number;
    updatedBy: number;
    updatedAt: Date;
    createdAt: Date;
}
