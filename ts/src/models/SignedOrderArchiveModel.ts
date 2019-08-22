import { SignedOrderModel } from './SignedOrderModel';

export enum EOrderAction {
    EOrderCancel = 'Cancel',
    EOrderCreate = 'Create',
    EOrderExipired = 'Expired',
    EOrderPartialFill = 'PartialFill',
    EOrderFill = 'Fill',
}
export class SignedOrderArchiveModel extends SignedOrderModel {
    public orderTimestamp?: Date;
    public orderAction?: EOrderAction;

    constructor(
        opts: {
            signedOrder?: SignedOrderModel;
            orderTimestamp?: Date;
            orderAction?: EOrderAction;
        } = {},
    ) {
        super(opts.signedOrder);
        this.orderAction = opts.orderAction;
        this.orderTimestamp = opts.orderTimestamp;
    }
}
