/* eslint-disable global-require */
const request = require('supertest');
const getRestanaInstance = require('../src/loaders/restana');
const data = require('./api/post-code.test.json');

describe('Loaders Test', () => {
    describe('restana', () => {
        beforeEach(() => {
            jest.resetModules();
        });

        test('should return the same instance when called multiple times', () => {
            const originalInstance = getRestanaInstance();
            const testTimes = 5;
            for (let i = 0; i < testTimes; i++) {
                const instance = getRestanaInstance();
                expect(instance).toBe(originalInstance);
            }
        });

        test('should respond with error when unhandled exception occurs', () => {
            jest.doMock('ajv', () => jest.fn(() => ({
                compile: () => () => { throw new Error(); }
            })));
            const newApp = require('../src/loaders/restana')();
            const newServer = newApp.getServer();
            return request(newServer)
                .post('/code')
                .send({ code: data.testStrings[0] })
                .expect(({ status }) => {
                    expect(status).toBe(500);
                });
        });
    });
});
