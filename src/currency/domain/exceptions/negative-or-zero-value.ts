export class NegativeOrZeroValueException extends Error {
    public readonly name = 'NegativeValueException';

    public readonly code = 'NEGATIVE_OR_ZERO_VALUE';

    constructor() {
        super("Not supported negative or zero value.");
    }
}
