import { Response } from "express";
import { NotSupportedCurrencyCodeException } from "../../domain/exceptions/invalid-currency-code";
import { NegativeOrZeroValueException } from "../../domain/exceptions/negative-or-zero-value";

export class CurrencyException {
    public static resolve(res: Response, error: unknown): Response {

        if (
            error instanceof NotSupportedCurrencyCodeException ||
            error instanceof NegativeOrZeroValueException
        ) {
            const { code, message } = error;
            return res.status(400).json({ code, message });
        }

        let detail = undefined;
        let stack = undefined;

        if (process.env.ENVIRONMENT === 'development') {
            const exc = error as Error;
            detail = exc.message;
            stack = exc.stack;
        }

        return res.status(500).json({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Internal server error.',
            detail,
            stack
        });
    }
}
