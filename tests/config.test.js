/* eslint-disable global-require */
describe('Environment Variables Test', () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...OLD_ENV };
    });

    test('should get configured port', () => {
        process.env.PORT = 4000;

        const config = require('../src/config');
        expect(config.port).toBe(4000);
    });

    test('should get configured hash length', () => {
        process.env.HASH_LENGTH = 8;

        const config = require('../src/config');
        expect(config.hashLength).toBe(8);
    });

    test('should get configured max retries', () => {
        process.env.MAX_RETRIES = 5;

        const config = require('../src/config');
        expect(config.maxRetries).toBe(5);
    });

    test('should get configured base URL', () => {
        process.env.BASE_URL = 'localhost';

        const config = require('../src/config');
        expect(config.baseURL).toBe('localhost');
    });

    test('should fallback to development environment', () => {
        process.env.NODE_ENV = undefined;

        require('../src/config');
        expect(process.env.NODE_ENV).toBe('development');
    });

    test('should fallback to default port', () => {
        process.env.PORT = undefined;

        const config = require('../src/config');
        expect(config.port).toBe(3000);
    });

    test('should fallback to default hash length', () => {
        process.env.HASH_LENGTH = undefined;

        const config = require('../src/config');
        expect(config.hashLength).toBe(6);
    });

    test('should fallback to default max retries', () => {
        process.env.MAX_RETRIES = undefined;

        const config = require('../src/config');
        expect(config.maxRetries).toBe(3);
    });

    test('should throw when base URL is not specified', () => {
        process.env.BASE_URL = undefined;

        const config = require('../src/config');
        expect(() => {
            // eslint-disable-next-line no-console
            console.log(config.baseURL);
        }).toThrow();
    });
});
