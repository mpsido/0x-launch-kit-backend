import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';

import { utils } from '../utils';

export function userMiddleware(req: express.Request, res: express.Response, next: express.NextFunction): void {
    utils.log('User Middleware', req, res);
    try {
        const tokenSecret = _.isEmpty(process.env.TOKEN_SECRET)
            ? 'RANDOM_SECRET'
            : (process.env.TOKEN_SECRET as string);
        const token = (req.headers as any).authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, tokenSecret);
        const userId = (decodedToken as any).userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw new Error('Invalid user ID');
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Authentication required!'),
        });
    }
}
