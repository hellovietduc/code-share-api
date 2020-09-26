const Ajv = require('ajv');
const codePostSchema = require('../schemas/code-post.json');
const codeGetSchema = require('../schemas/code-get.json');
const apiLogger = require('../../loaders/logger')('api');
const { errorMsg } = require('../enum');

const ajv = new Ajv();

const validator = (schema, src) => {
    const validate = ajv.compile(schema);
    return (req, res, next) => {
        if (validate(req[src])) return next();
        apiLogger.error('validation error:', validate.errors);
        res.send(errorMsg.INVALID_REQUEST, 400);
    };
};

module.exports.validatePostCode = validator(codePostSchema, 'body');
module.exports.validateGetCode = validator(codeGetSchema, 'params');
