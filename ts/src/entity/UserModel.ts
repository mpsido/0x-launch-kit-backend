import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { SignedOrderArchiveModel } from './SignedOrderArchiveModel';

@Entity()
export class UserModel {
    @PrimaryGeneratedColumn()
    _id?: number;

    @Column()
    name?: string;

    @Column()
    email?: string;

    @Column()
    password?: string;

    @Column()
    isBanned?: boolean;

    @OneToMany(() => SignedOrderArchiveModel, (oclass: SignedOrderArchiveModel) => oclass.user)
    orders?: SignedOrderArchiveModel[];

    constructor(
        opts: {
            name?: string;
            email?: string;
            password?: string;
            userAddress?: string;
            isBanned?: boolean;
            orders?: SignedOrderArchiveModel[];
        } = {},
    ) {
        this.name = opts.name;
        this.email = opts.email;
        this.password = opts.password;
        this.isBanned = opts.isBanned;
        this.orders = opts.orders;
    }
}
