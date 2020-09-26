const utils = require('../src/utils/index');
const data = require('./utils.test.json');

describe('Utils Functions Test', () => {
    describe('getRandomInt()', () => {
        test('should return an integer', () => {
            for (const range of data.testRanges) {
                const rand = utils.getRandomInt(...range);
                expect(Number.isInteger(rand)).toBe(true);
            }
        });

        test('should return an inclusive integer', () => {
            for (const range of data.testRanges) {
                const rand = utils.getRandomInt(...range);
                expect(rand).toBeGreaterThanOrEqual(range[0]);
                expect(rand).toBeLessThanOrEqual(range[1]);
            }
        });

        test('should throw an error when passed reversed ranges', () => {
            for (const range of data.reversedRanges) {
                expect(() => {
                    utils.getRandomInt(...range);
                }).toThrow();
            }
        });
    });
});
