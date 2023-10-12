import { CompanyInfo } from "./company-info.model";

export class Contact {

    id: number;
    version: number;

    companyInfo: CompanyInfo;
    telephoneNo: string;
    faxNo: string
    email: string;
    website: string;

    isEdit: boolean;

    createdBy: number;
    updatedBy: number;
    updatedAt: Date;
    createdAt: Date;
}
