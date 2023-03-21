import { container } from "tsyringe";
import { CurrencyMapConverterRepositoryInterface } from "../../../currency/domain/currency-map-converter.repository.interface";
import { CurrencyMapConverterRepository } from "../../../currency/infra/database/currency-map-converter.repository";

container.registerSingleton<CurrencyMapConverterRepositoryInterface>(
    'CurrencyMapConverterRepository',
    CurrencyMapConverterRepository
);
