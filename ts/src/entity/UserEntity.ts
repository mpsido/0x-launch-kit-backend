import { EntitySchema } from 'typeorm';

import { UserModel } from '../models/UserModel';

export const userEntity = new EntitySchema<UserModel>({
    name: 'User',
    target: UserModel,
    columns: {
        _id: {
            type: 'int',
            primary: true,
            generated: true,
        },
        name: {
            type: 'varchar',
        },
        email: {
            type: 'varchar',
        },
        password: {
            type: 'varchar',
        },
        isBanned: {
            type: 'bool',
        },
    },
});
