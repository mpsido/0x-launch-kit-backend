import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class SignedOrderModel {
    @PrimaryColumn()
    hash?: string;

    @Column()
    senderAddress?: string;

    @Column()
    makerAddress?: string;

    @Column()
    takerAddress?: string;

    @Column()
    makerAssetData?: string;

    @Column()
    takerAssetData?: string;

    @Column()
    exchangeAddress?: string;

    @Column()
    feeRecipientAddress?: string;

    @Column()
    expirationTimeSeconds?: number;

    @Column()
    makerFee?: string;

    @Column()
    takerFee?: string;

    @Column()
    makerAssetAmount?: string;

    @Column()
    takerAssetAmount?: string;

    @Column()
    salt?: string;

    @Column()
    signature?: string;

    constructor(
        opts: {
            hash?: string;
            senderAddress?: string;
            makerAddress?: string;
            takerAddress?: string;
            makerAssetData?: string;
            takerAssetData?: string;
            exchangeAddress?: string;
            feeRecipientAddress?: string;
            expirationTimeSeconds?: number;
            makerFee?: string;
            takerFee?: string;
            makerAssetAmount?: string;
            takerAssetAmount?: string;
            salt?: string;
            signature?: string;
        } = {},
    ) {
        this.hash = opts.hash;
        this.senderAddress = opts.senderAddress;
        this.makerAddress = opts.makerAddress;
        this.takerAddress = opts.takerAddress;
        this.makerAssetData = opts.makerAssetData;
        this.takerAssetData = opts.takerAssetData;
        this.exchangeAddress = opts.exchangeAddress;
        this.feeRecipientAddress = opts.feeRecipientAddress;
        this.expirationTimeSeconds = opts.expirationTimeSeconds;
        this.makerFee = opts.makerFee;
        this.takerFee = opts.takerFee;
        this.makerAssetAmount = opts.makerAssetAmount;
        this.takerAssetAmount = opts.takerAssetAmount;
        this.salt = opts.salt;
        this.signature = opts.signature;
    }
}
