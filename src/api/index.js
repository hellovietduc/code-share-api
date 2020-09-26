const validator = require('./middlewares/validator');
const postCode = require('./routes/post-code');
const getCode = require('./routes/get-code');

module.exports = app => {
    app.post('/code', validator.validatePostCode, postCode);
    app.get('/code/:hash', validator.validateGetCode, getCode);
};
