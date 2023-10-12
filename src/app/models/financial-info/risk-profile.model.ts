import { CompanyInfo } from "./company-info.model";

export class RiskProfile {
    id: number;
    version: number;

    companyInfo: CompanyInfo;
    itemCode: string;
    percentage: number
    status: string
    
    isEdit: boolean;

    createdBy: number;
    updatedBy: number;
    updatedAt: Date;
    createdAt: Date;
}
