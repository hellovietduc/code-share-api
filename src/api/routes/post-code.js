const normalizeUrl = require('normalize-url');
const apiLogger = require('../../loaders/logger')('api');
const storage = require('../../loaders/storage');
const hashGenerator = require('../../services/hash-generator');
const config = require('../../config');
const { errorMsg } = require('../enum');

module.exports = async (req, res) => {
    try {
        const { code } = req.body;
        const hash = await hashGenerator.generate();
        const url = normalizeUrl(`${config.baseURL}/${hash}`);
        await storage.set(hash, { code, url });
        res.send({ url }, 201);
        apiLogger.success('saved code:', hash);
    } catch (err) {
        apiLogger.error('saving code error:', err);
        res.send(errorMsg.UNKNOWN_ERROR, 500);
    }
};
