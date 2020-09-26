/* eslint-disable global-require */
const request = require('supertest');
const app = require('../../src/loaders/restana')();
const { errorMsg } = require('../../src/api/enum');
const data = require('./get-code.test.json');

const server = app.getServer();

describe('Endpoint GET /code/:hash Test', () => {
    const dataMap = new Map();

    beforeAll(async () => {
        // initialize some data on the server
        await Promise.all(data.testStrings.map(async code => {
            const { body } = await request(server)
                .post('/code')
                .send({ code });
            dataMap.set(body.url, code);
        }));
    });

    beforeEach(() => {
        jest.resetModules();
    });

    test('should respond with correct code', async () => {
        const promises = [];
        for (const [url, expectedCode] of dataMap) {
            const hash = url.split('/').pop();
            promises.push(request(server)
                .get(`/code/${encodeURIComponent(hash)}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toHaveProperty('code');
                    expect(body.code).toBe(expectedCode);
                }));
        }
        await Promise.all(promises);
    });

    test('should respond with error when exception occurs', () => {
        jest.doMock('keyv', () => jest.fn(() => ({
            get: () => Promise.reject()
        })));
        const newApp = require('../../src/loaders/restana')();
        const newServer = newApp.getServer();
        return request(newServer)
            .get(`/code/${data.invalidHashes[0]}`)
            .expect('Content-Type', /json/)
            .expect(500)
            .expect(({ body }) => {
                expect(body).toEqual(errorMsg.UNKNOWN_ERROR);
            });
    });

    test('should check for invalid hash', async () => {
        await Promise.all(data.invalidHashes.map(hash => request(server)
            .get(`/code/${encodeURIComponent(hash)}`)
            .expect('Content-Type', /json/)
            .expect(404)
            .expect(({ body }) => {
                expect(body).toEqual(errorMsg.NOT_FOUND);
            })));
    });

    test('should check for invalid character', async () => {
        await Promise.all(data.invalidCharacterHashes.map(hash => request(server)
            .get(`/code/${encodeURIComponent(hash)}`)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(({ body }) => {
                expect(body).toEqual(errorMsg.INVALID_REQUEST);
            })));
    });

    afterAll(() => {
        server.close();
    });
});
