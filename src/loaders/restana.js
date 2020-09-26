const restana = require('restana');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');
const routeAPI = require('../api');
const apiLogger = require('./logger')('api');

let app = null;

module.exports = () => {
    if (app) return app;
    app = restana({
        errorHandler: (err, req, res) => {
            apiLogger.error('unhandled error:', err);
            res.send(500);
        }
    });
    app.use(bodyParser.json());
    app.use(compression());
    app.use(cors({
        methods: ['GET', 'POST']
    }));
    app.use(morgan((tokens, req, res) => {
        const status = tokens.status(req, res);
        const log = [
            tokens.method(req, res),
            tokens.url(req, res), '-',
            status,
            tokens['response-time'](req, res), 'ms'
        ].join(' ');
        const logLevel = status >= 400 ? 'error' : 'info';
        apiLogger[logLevel](log);
    }));
    routeAPI(app);
    return app;
};
