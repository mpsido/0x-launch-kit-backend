import { Entity, Column, ManyToOne } from 'typeorm';
import { UserModel } from './UserModel';
import { SignedOrderModel } from './SignedOrderModel';

export enum EOrderAction {
    EOrderCancel = 'Cancel',
    EOrderCreate = 'Create',
    EOrderExipired = 'Expired',
    EOrderPartialFill = 'PartialFill',
    EOrderFill = 'Fill',
}

@Entity()
export class SignedOrderArchiveModel extends SignedOrderModel {
    @Column()
    orderTimestamp?: Date;

    @Column()
    orderAction?: string;

    @ManyToOne(() => UserModel, (oclass: UserModel) => oclass.orders)
    user?: UserModel;

    constructor(
        opts: {
            signedOrder?: SignedOrderModel;
            orderTimestamp?: Date;
            orderAction?: EOrderAction;
            user?: UserModel;
        } = {},
    ) {
        super(opts.signedOrder);
        this.orderTimestamp = opts.orderTimestamp;
        this.orderAction = opts.orderAction;
        this.user = opts.user;
    }
}
