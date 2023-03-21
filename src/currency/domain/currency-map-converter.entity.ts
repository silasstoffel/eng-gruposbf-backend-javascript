import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index } from "typeorm"
import { CurrencyCode } from "./currency-code.enum";

@Entity()
export class CurrencyMapConverter {
    @PrimaryGeneratedColumn('uuid')
    public id?: string;

    @Index()
    @Column({
        type: "enum",
        nullable: false,
        enum: CurrencyCode
    })
    public currencyCodeFrom!: CurrencyCode;

    @Index()
    @Column({
        type: "enum",
        nullable: false,
        enum: CurrencyCode
    })
    public currencyCodeTo!: CurrencyCode;

    @Column({
        type: "decimal",
        nullable: false,
        precision: 9,
        scale: 2
    })
    public value!: number;


    @Column({ type: "boolean" })
    public active = true;

    @CreateDateColumn()
    public createdAt?: Date;

    @UpdateDateColumn()
    public updatedAt?: Date
}
