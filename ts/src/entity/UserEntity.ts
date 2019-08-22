import { EntitySchema } from 'typeorm';

import { UserModel } from '../models/UserModel';

export const userEntity = new EntitySchema<UserModel>({
    name: 'User',
    target: UserModel,
    columns: {
        userAddress: {
            primary: true,
            type: 'varchar',
        },
        isBanned: {
            type: 'bool',
        },
    },
});
