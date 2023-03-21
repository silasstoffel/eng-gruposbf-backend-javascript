import { Router } from "express";
import { CurrencyConvertController } from "../../../../currency/infra/http/currency-converter.controller";

const convertRoute = Router();
const convertController = new CurrencyConvertController()

convertRoute.get("/:currencyCodeFrom/:value", convertController.handle);

export { convertRoute }
