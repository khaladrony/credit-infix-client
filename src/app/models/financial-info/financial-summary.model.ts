export class FinancialSummary {
    id: number;
    version: number;

    itemCode: string;
    currency: string
    amount: number;
    isEdit: boolean;

    createdBy: number;
    updatedBy: number;
    updatedAt: Date;
    createdAt: Date;
}
