const apiLogger = require('../../loaders/logger')('api');
const storage = require('../../loaders/storage');
const { errorMsg } = require('../enum');

module.exports = async (req, res) => {
    try {
        const { hash } = req.params;
        const saved = await storage.get(hash);
        if (saved && saved.code) {
            res.send({ code: saved.code }, 200);
        } else {
            res.send(errorMsg.NOT_FOUND, 404);
            apiLogger.error('code not found:', hash);
        }
    } catch (err) {
        apiLogger.error('querying code error:', err);
        res.send(errorMsg.UNKNOWN_ERROR, 500);
    }
};
