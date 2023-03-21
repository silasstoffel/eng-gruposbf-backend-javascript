import { Repository } from "typeorm";
import { AppDataSource } from "../../../shared/infra/database/typeorm/data-source";
import { CurrencyCode } from "../../domain/currency-code.enum";
import { CurrencyMapConverter } from "../../domain/currency-map-converter.entity";
import { CurrencyMapConverterRepositoryInterface } from "../../domain/currency-map-converter.repository.interface";

export class CurrencyMapConverterRepository implements CurrencyMapConverterRepositoryInterface {

    private repository: Repository<CurrencyMapConverter>;

    constructor() {
        this.repository = AppDataSource.getRepository(CurrencyMapConverter);
    }

    public async findMappedRecordsConvertTo(currencyCode: CurrencyCode): Promise<CurrencyMapConverter[]> {
        return this.repository.findBy({
            currencyCodeTo: currencyCode,
            active: true
        });
    }
}
