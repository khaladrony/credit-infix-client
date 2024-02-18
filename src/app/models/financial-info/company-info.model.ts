export class CompanyInfo {
    id: number;
    version: number;

    name: string;
    transactionDate: Date
    legalAddress: string
    operationAddress: string
    telephoneNumber: string
    website: string
    industryType: string
    yearEstablished: string
    ageOfBusiness: string
    businessType: string
    country: string
    currency: string
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

    maximumCredit: string
    creditRating: string

    //Basic info
    clientName:string;
    clientRefNo:string;
    infixRefNo:string;
    serviceType:string;
    inquiryDate:string;
    dueDate:string;
    deliveryDate:string;
    reportDate:string;
    productName:string;

    isEdit: boolean;

    createdBy: number;
    updatedBy: number;
    updatedAt: Date;
    createdAt: Date;
}
