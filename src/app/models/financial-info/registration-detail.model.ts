export class RegistrationDetail {
    id: number;
    version: number;

    item: string;
    subItem: string;
    itemValue: string
    isEdit: boolean;
    isRowSpan: boolean;
    isColSpan: boolean;

    createdBy: number;
    updatedBy: number;
    updatedAt: Date;
    createdAt: Date;
}
