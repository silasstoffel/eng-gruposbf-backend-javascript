import { CurrencyCode } from "../domain/currency-code.enum";

export class CurrencyConvertOutput {
    public code!: CurrencyCode;

    public value!: number;
}
