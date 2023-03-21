export class NotSupportedCurrencyCodeException extends Error {
    public readonly name = 'NotSupportedCurrencyCodeException';

    public readonly code = 'NOT_SUPPORTED_CURRENCY_CODE';

    constructor() {
        super("Not supported currency code.");
    }
}
