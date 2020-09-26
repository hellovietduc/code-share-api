const dotenv = require('dotenv');

const envFound = dotenv.config();
if (envFound.error) {
    throw new Error('Could not find .env file');
}

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    /**
     * The port number to listen on.
     * If not configured, it defaults to 3000.
     */
    get port() {
        const port = parseInt(process.env.PORT, 10);
        return port >= 0 ? port : 3000;
    },

    /**
     * The length of the hash.
     * If not configured, it defaults to 6.
     */
    get hashLength() {
        const len = parseInt(process.env.HASH_LENGTH, 10);
        return len > 0 ? len : 6;
    },

    /**
     * The maximum number of retries when generating the hash.
     * If not configured, it defaults to 3.
     */
    get maxRetries() {
        const retries = parseInt(process.env.MAX_RETRIES, 10);
        return retries > 0 ? retries : 3;
    },

    /**
     * The base URL of the Code Share website.
     */
    get baseURL() {
        const url = process.env.BASE_URL;
        if (!url) {
            throw new Error('Base URL must be specified');
        }
        return url;
    }
};
