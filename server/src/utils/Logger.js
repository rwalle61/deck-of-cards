const log4js = require('log4js');
const { inspect } = require('util');

const { defaultLogLevel } = require('../config');
const { isEmpty } = require('.');

const contextName = 'context';
const config = {
    appenders: {
        out: {
            type: 'stdout',
            layout: {
                type: 'pattern',
                pattern: `%[[%d{dd/MM/yy hh:mm:ss} %X{${contextName}}] [%p]%] %m`,
            },
        },
    },
    categories: { default: { appenders: ['out'], level: defaultLogLevel } },
};

const validLevels = ['error', 'warn', 'info', 'debug', 'trace'];

const setLoggingLevel = (level) => {
    if (!validLevels.includes(level)) {
        throw new Error('INVALID_LEVEL');
    }
    config.categories.default.level = level;
    log4js.configure(config);
};

class Logger {
    constructor(context) {
        this.log = log4js.getLogger();
        log4js.configure(config);
        this.log.addContext(contextName, context);
    }

    trace(msg) { this.log.trace(msg); }

    debug(msg) { this.log.debug(msg); }

    info(msg) { this.log.info(msg); }

    warn(msg) { this.log.warn(msg); }

    error(msg) { this.log.error(msg); }

    logAllApiCalls(app) {
        app.use((req, res, next) => {
            this.logRequest(req);
            this.logResponse(req, res);
            next();
        });
    }

    logRequest(req) {
        const route = `${req.method} ${req.path}`;
        let msg = `${route} called`;
        if (!this.log.isTraceEnabled()) {
            this.debug(msg);
        } else {
            msg += ` with \n req.body ${inspect(req.body)}`;
            if (req.query && !isEmpty(req.query)) {
                msg += `, and \n req.query ${inspect(req.query)}`;
            }
            this.trace(msg);
        }
    }

    logResponse(req, res) {
        res.on('finish', () => {
            const route = `${req.method} ${req.path}`;
            this.trace(`responded to ${route} with status ${res.statusCode}`);
        });
    }
}

module.exports = Logger;
module.exports.setLoggingLevel = setLoggingLevel;
