import { injectable, inject } from "tsyringe";
import { CurrencyCode } from "../domain/currency-code.enum";
import { CurrencyMapConverter } from "../domain/currency-map-converter.entity";
import { CurrencyMapConverterRepositoryInterface } from "../domain/currency-map-converter.repository.interface";
import { NotSupportedCurrencyCodeException } from "../domain/exceptions/invalid-currency-code";
import { NegativeOrZeroValueException } from "../domain/exceptions/negative-or-zero-value";
import { CurrencyConvertInput } from "./currency-convert.input";
import { CurrencyConvertOutput } from "./currency-convert.output";

@injectable()
export class ConvertUseCase {

    public constructor(
        @inject('CurrencyMapConverterRepository')
        private readonly currencyMapConverterRepository: CurrencyMapConverterRepositoryInterface,
    ) {}

    public async execute(parameters: CurrencyConvertInput): Promise<CurrencyConvertOutput[]> {
        this.checkInputValues(parameters);

        const records = await this.currencyMapConverterRepository
            .findMappedRecordsConvertTo(
                parameters.code as CurrencyCode
            );

        return records.map(
            item => this.convert(item, parameters.value)
        );
    }

    private convert(map: CurrencyMapConverter, originalValue: number): CurrencyConvertOutput {
        const value = Number((originalValue / map.value).toFixed(2));
        return { value, code: map.currencyCodeFrom}
    }

    private checkInputValues(parameters: CurrencyConvertInput) {
        const code = Object.keys(CurrencyCode).find(item => item === parameters.code);
        if (!code) {
            throw new NotSupportedCurrencyCodeException();
        }

        if (!parameters.value || parameters.value <= 0) {
            throw new NegativeOrZeroValueException();
        }

        throw new Error('Forced error.');
    }
}
