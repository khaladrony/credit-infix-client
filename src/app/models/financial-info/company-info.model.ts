export class CompanyInfo {
    id: number;
    version: number;

    name: string;
    legalAddress: string
    operationAddress: string
    telephoneNumber: string
    website: string
    faxNo: string
    email: string
    industryType: string
    yearEstablished: string
    ageOfBusiness: string
    businessType: string
    country: string
    state: string
    businessScale: string
    paymentPractices: string
    listedStatus: string
    status: string

    // Corporate Structure
    numberOfDirector: string
    numberOfShareholders: string
    numberOfEmployee: string
    numberOfSubsidiaries: string
    holdingCompany: string
    affiliatedCompanies: string
    legalStatus: string
    noOfCharge: string
    noOfJudicialRecord: string

    isEdit: boolean;

    createdBy: number;
    updatedBy: number;
    updatedAt: Date;
    createdAt: Date;
}
