export class CurrencyDailyRate {

    id: number;
    version: number;

    countryId: number;
    currency: string;
    currencyRate: number;
    currencyDate: string;
    unit: number;

    isEdit: boolean;

    createdBy: number;
    updatedBy: number;
    updatedAt: Date;
    createdAt: Date;
}
