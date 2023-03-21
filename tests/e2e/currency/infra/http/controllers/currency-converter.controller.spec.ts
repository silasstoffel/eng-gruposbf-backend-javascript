import request from "supertest";
import { CurrencyCode } from "../../../../../../src/currency/domain/currency-code.enum";
import { app } from "../../../../../../src/shared/infra/http/app";
import { initializeDataSource } from "../../../../../helpers/setup-data-source";

async function convert(currencyCode:string, value: string) {
    return request(app)
            .get(`/api/convert/${currencyCode}/${value}`)
            .send();
}

const convertedResponse = [
    { value: 101.14, code: "USD" }, // 1 USD = R$ 5,24
    { value: 94.47, code: "EUR" },  // 1 EUR = R$ 5,61
    { value: 8833.17, code: "INR" } // 1 INR = R$ 0,06
];

describe("CurrencyConvertController", () => {

    beforeAll(async () => {
        await initializeDataSource();
    });

    describe("when should be possible to convert", () => {
        it("should convert when value contain dot as decimal separator", async() => {
            const response = await convert(CurrencyCode.BRL, '529.99');
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(convertedResponse));
        });

        it("should convert when value contain comma as decimal separator", async() => {
            const response = await convert(CurrencyCode.BRL, '529,99');
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(convertedResponse));
        });
    });

    describe("when should not be possible to convert", () => {

        describe("when currency is not supported", () => {
            it("should detail error", async() => {
                const response = await convert('ARS', '500.00');
                expect(response.status).toBe(400);
                expect(response.body).toHaveProperty("code", "NOT_SUPPORTED_CURRENCY_CODE");
                expect(response.body).toHaveProperty("message", "Not supported currency code.");
            });
        });

        describe("when value is not supported", () => {
            it("should detail error when value is negative", async() => {
                const response = await convert(CurrencyCode.BRL, '-529,99');
                expect(response.status).toBe(400);
                expect(response.body).toHaveProperty("code", "NEGATIVE_OR_ZERO_VALUE");
                expect(response.body).toHaveProperty("message", "Not supported negative or zero value.");
            });

            it("should detail error when value is zero", async() => {
                const response = await convert(CurrencyCode.BRL, '0');
                expect(response.status).toBe(400);
                expect(response.body).toHaveProperty("code", "NEGATIVE_OR_ZERO_VALUE");
                expect(response.body).toHaveProperty("message", "Not supported negative or zero value.");
            });
        });

    });

});
