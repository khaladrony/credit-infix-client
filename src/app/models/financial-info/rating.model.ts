export class Rating {
    id: number;
    version: number;

    startRange: number
    endRange: number
    grade: string
    colorCode: string
    remarks: string
    description: string
    
    isEdit: boolean;

    createdBy: number;
    updatedBy: number;
    updatedAt: Date;
    createdAt: Date;
}
