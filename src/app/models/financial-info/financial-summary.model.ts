import { CompanyInfo } from "./company-info.model";

export class FinancialSummary {
    id: number;
    version: number;

    companyInfo: CompanyInfo;
    itemCode: string;
    currency: string
    amount: number;
    comments: string;
    isEdit: boolean;

    createdBy: number;
    updatedBy: number;
    updatedAt: Date;
    createdAt: Date;
}
