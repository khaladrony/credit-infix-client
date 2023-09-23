export class FinancialNote {
    id: number;
    version: number;

    note: string;
    auditor: string
    isEdit: boolean;

    createdBy: number;
    updatedBy: number;
    updatedAt: Date;
    createdAt: Date;
}
