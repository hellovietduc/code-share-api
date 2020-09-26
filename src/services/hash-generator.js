const storage = require('../loaders/storage');
const utils = require('../utils');
const config = require('../config');

const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const rand = () => {
    const output = [];
    while (output.length < config.hashLength) {
        const index = utils.getRandomInt(0, 61);
        output.push(BASE62[index]);
    }
    return output.join('');
};

/**
 * Generate a random base 62 string.
 * @returns {Promise<string>} A random base 62 string.
 */
const generate = async (tries = 0) => {
    if (tries >= config.maxRetries) {
        throw new Error('Too many retries');
    }
    const hash = rand();
    const exists = await storage.get(hash);
    if (exists) {
        return generate(tries + 1);
    }
    return hash;
};

module.exports = {
    generate
};
