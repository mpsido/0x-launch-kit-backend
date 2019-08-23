import * as bcrypt from 'bcrypt';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';

import { getDBConnection } from '../db_connection';
import { UserModel } from '../models/UserModel';

export async function signup(req: express.Request, res: express.Response): Promise<void> {
    const tokenSalt = _.isEmpty(process.env.SALT) ? 10 : parseInt(process.env.SALT as string);
    const salt = bcrypt.genSaltSync(tokenSalt);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const user = new UserModel({
        email: req.body.email,
        password: hash,
        isBanned: false,
    });
    const connection = getDBConnection();
    const userDb = await connection.manager.findOne(UserModel, { where: { email: req.body.email } });
    if (userDb) {
        res.status(401).json({
            message: 'User already exists',
        });
        return;
    }
    connection.manager
        .save(user)
        .then(() => {
            res.status(201).json({
                message: 'User added successfully!',
            });
        })
        .catch((error: Error) => {
            res.status(500).json({
                error,
            });
        });
}

export async function login(req: express.Request, res: express.Response): Promise<void> {
    const connection = getDBConnection();
    const user = await connection.manager.findOne(UserModel, { where: { email: req.body.email } });
    if (!user) {
        res.status(401).json({
            error: new Error('User not found!'),
        });
        return;
    }
    const tokenSecret = _.isEmpty(process.env.TOKEN_SECRET) ? 'RANDOM_SECRET' : (process.env.TOKEN_SECRET as string);
    if (req.body.password !== user.password) {
        res.status(401).json({
            error: new Error('Incorrect password!'),
        });
        return;
    }
    res.status(200).json({
        userId: user._id,
        token: jwt.sign((user._id as number).toString(), tokenSecret),
    });
}
