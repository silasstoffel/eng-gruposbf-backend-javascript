import { CurrencyCode } from "./currency-code.enum";
import { CurrencyMapConverter } from "./currency-map-converter.entity"

export interface CurrencyMapConverterRepositoryInterface {
    findMappedRecordsConvertTo(currencyCode: CurrencyCode): Promise<CurrencyMapConverter[]>;
}
