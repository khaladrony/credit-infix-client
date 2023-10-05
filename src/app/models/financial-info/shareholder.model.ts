export class Shareholder {
    id: number;
    version: number;

    itemCode: string;
    itemValue: string;
    sequence: number;
    isEdit: boolean;

    createdBy: number;
    updatedBy: number;
    updatedAt: Date;
    createdAt: Date;
}
