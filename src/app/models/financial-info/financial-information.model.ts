import { CompanyInfo } from "./company-info.model";

export class FinancialInformation {
    id: number;
    version: number;

    companyInfo: CompanyInfo;
    itemCode: string;
    thirdYear: string
    secondYear: string
    firstYear: string

    isEdit: boolean;

    createdBy: number;
    updatedBy: number;
    updatedAt: Date;
    createdAt: Date;
}
