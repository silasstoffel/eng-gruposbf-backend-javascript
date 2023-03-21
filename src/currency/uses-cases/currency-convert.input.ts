import { CurrencyCode } from "../domain/currency-code.enum";

export class CurrencyConvertInput {
    public code!: string;

    public value!: number;
}
