export class RiskLevel {

    id: number;
    version: number;

    category: string;
    startRange: number
    endRange: number
    remarks: string
    
    isEdit: boolean;

    createdBy: number;
    updatedBy: number;
    updatedAt: Date;
    createdAt: Date;
}
