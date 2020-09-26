const hashGenerator = require('../../src/services/hash-generator');
const config = require('../../src/config');
const data = require('./hash-generator.test.json');

describe('HashGenerator Test', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    test('hash values should have configured length', () => {
        const lengthTests = [];
        for (const str of data.testStrings) {
            lengthTests.push(hashGenerator
                .generate(str)
                .then(hash => {
                    expect(hash).toHaveLength(config.hashLength);
                }));
        }
        return Promise.all(lengthTests);
    });

    test('hash values should be base 62', () => {
        const BASE62 = /^[0-9a-zA-Z]+$/;
        const base62Tests = [];
        for (const str of data.testStrings) {
            base62Tests.push(hashGenerator
                .generate(str)
                .then(hash => {
                    expect(BASE62.test(hash)).toBe(true);
                }));
        }
        return Promise.all(base62Tests);
    });

    test('should throw when maximum retries reached', () => {
        jest.doMock('keyv', () => jest.fn(() => ({
            get: () => Promise.resolve(true)
        })));
        // eslint-disable-next-line global-require
        const localHashGenerator = require('../../src/services/hash-generator');
        return expect(localHashGenerator.generate()).rejects.toBeDefined();
    });
});
