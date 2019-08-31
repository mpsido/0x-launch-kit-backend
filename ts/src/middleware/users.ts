import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';

import { utils } from '../utils';

export function userMiddleware(req: express.Request, res: express.Response, next: express.NextFunction): void {
    try {
        const tokenSecret = _.isEmpty(process.env.TOKEN_SECRET)
            ? 'RANDOM_SECRET'
            : (process.env.TOKEN_SECRET as string);
        let request;
        if (req.method == 'POST') {
            request = req.body as any;
        } else if (req.method == 'GET') {
            request = req.query as any;
        } else {
            throw new Error('User Middleware only works with POST and GET requests');
        }
        const token = request.authorization.split(' ')[1];
        utils.log(`User Middleware ${req.method}!`, token, request.userId);
        const decodedToken = jwt.verify(token, tokenSecret);
        const userId = request.userId;
        if (request.userId && decodedToken != userId) {
            throw new Error('Invalid user ID');
        } else {
            utils.log('Authentication success');
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Authentication required!'),
        });
    }
}
