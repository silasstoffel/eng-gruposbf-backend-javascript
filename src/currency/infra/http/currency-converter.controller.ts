import { Request, Response } from "express";
import { container } from "tsyringe";
import { ConvertUseCase } from "../../uses-cases/convert-use.case";
import { CurrencyException } from "./currency-exceptions";

export class CurrencyConvertController {
  async handle(req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(ConvertUseCase);
    const { currencyCodeFrom: code , value: stringValue } = req.params;
    const value = Number(stringValue.replace(',', '.'));

    try {
        const data = await useCase.execute({ code, value });
        return res.status(200).json(data);
    } catch (error: unknown) {
        return CurrencyException.resolve(res, error);
    }
  }
}
