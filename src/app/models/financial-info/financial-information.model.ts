export class FinancialInformation {
    id: number;
    version: number;

    itemCode: string;
    currentYear: string
    middleYear: string
    firstYear: string
    isEdit: boolean;

    createdBy: number;
    updatedBy: number;
    updatedAt: Date;
    createdAt: Date;
}
