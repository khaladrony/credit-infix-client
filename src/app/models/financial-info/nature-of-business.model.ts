import { CompanyInfo } from "./company-info.model";

export class NatureOfBusiness {
    id: number;
    version: number;

    companyInfo: CompanyInfo;
    itemCode: string;
    itemValue: string
    
    isEdit: boolean;

    createdBy: number;
    updatedBy: number;
    updatedAt: Date;
    createdAt: Date;
}
