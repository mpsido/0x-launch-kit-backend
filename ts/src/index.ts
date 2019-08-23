import '@babel/polyfill';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as asyncHandler from 'express-async-handler';
import * as fs from 'fs';
import * as https from 'https';
import * as _ from 'lodash';
import 'reflect-metadata';

import * as config from './config';
import { login, signup } from './controllers/users';
import { initDBConnectionAsync } from './db_connection';
import { Handlers } from './handlers';
import { errorHandler } from './middleware/error_handling';
import { urlParamsParsing } from './middleware/url_params_parsing';
// import { userMiddleware } from './middleware/users';
import { utils } from './utils';

(async () => {
    await initDBConnectionAsync();
    const handlers = new Handlers();
    await handlers.initOrderBookAsync();
    const app = express();
    const corsOptions = {
        origin: '*', // ['http://localhost:3001', 'https://localhost:3001', 'https://d-ex.io'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    };
    app.use(cors(corsOptions));
    app.use(bodyParser.json());
    app.use(urlParamsParsing);

    /**
     * GET AssetPairs endpoint retrieves a list of available asset pairs and the information required to trade them.
     * http://sra-spec.s3-website-us-east-1.amazonaws.com/#operation/getAssetPairs
     */
    app.get('/v2/asset_pairs', asyncHandler(Handlers.assetPairsAsync.bind(Handlers)));
    /**
     * GET Orders endpoint retrieves a list of orders given query parameters.
     * http://sra-spec.s3-website-us-east-1.amazonaws.com/#operation/getOrders
     */
    app.get('/v2/orders', asyncHandler(handlers.ordersAsync.bind(handlers)));
    /**
     * GET Orderbook endpoint retrieves the orderbook for a given asset pair.
     * http://sra-spec.s3-website-us-east-1.amazonaws.com/#operation/getOrderbook
     */
    app.get('/v2/orderbook', asyncHandler(handlers.orderbookAsync.bind(handlers)));
    /**
     * POST Order config endpoint retrives the values for order fields that the relayer requires.
     * http://sra-spec.s3-website-us-east-1.amazonaws.com/#operation/getOrderConfig
     */
    app.post('/v2/order_config', Handlers.orderConfig.bind(Handlers));
    /**
     * GET FeeRecepients endpoint retrieves a collection of all fee recipient addresses for a relayer.
     * http://sra-spec.s3-website-us-east-1.amazonaws.com/v2/fee_recipients
     */
    app.get('/v2/fee_recipients', Handlers.feeRecipients.bind(Handlers));
    /**
     * POST Order endpoint submits an order to the Relayer.
     * http://sra-spec.s3-website-us-east-1.amazonaws.com/#operation/postOrder
     */
    app.post('/v2/order', asyncHandler(handlers.postOrderAsync.bind(handlers)));
    /**
     * GET Order endpoint retrieves the order by order hash.
     * http://sra-spec.s3-website-us-east-1.amazonaws.com/#operation/getOrder
     */
    app.get('/v2/order/:orderHash', asyncHandler(Handlers.getOrderByHashAsync.bind(Handlers)));

    app.post('/v2/signup', asyncHandler(signup));
    app.post('/v2/login', asyncHandler(login));

    app.use(errorHandler);

    const USE_HTTPS = _.isEmpty(process.env.USE_HTTPS) ? false : process.env.USE_HTTPS === 'true';
    utils.log('Using https:', USE_HTTPS, process.env.USE_HTTPS);
    if (USE_HTTPS) {
        https
            .createServer(
                {
                    key: fs.readFileSync('encryption/private.key'),
                    cert: fs.readFileSync('encryption/certificate.crt'),
                },
                app,
            )
            .listen(config.HTTP_PORT, () => {
                utils.log(
                    `Standard relayer API (HTTPS) listening on port ${config.HTTP_PORT}!\nConfig: ${JSON.stringify(
                        config,
                        null,
                        2,
                    )}`,
                );
            });
    } else {
        app.listen(config.HTTP_PORT, () => {
            utils.log(
                `Standard relayer API (HTTP) listening on port ${config.HTTP_PORT}!\nConfig: ${JSON.stringify(
                    config,
                    null,
                    2,
                )}`,
            );
        });
    }
})().catch(utils.log);
