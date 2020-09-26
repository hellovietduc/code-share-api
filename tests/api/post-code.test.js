/* eslint-disable global-require */
const request = require('supertest');
const app = require('../../src/loaders/restana')();
const { errorMsg } = require('../../src/api/enum');
const config = require('../../src/config');
const data = require('./post-code.test.json');

const server = app.getServer();

describe('Endpoint POST /code Test', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    test('should respond with shortened URL', async () => {
        await Promise.all(data.testStrings.map(code => request(server)
            .post('/code')
            .send({ code })
            .expect('Content-Type', /json/)
            .expect(201)
            .expect(({ body }) => {
                expect(body).toHaveProperty('url');
                const hash = body.url.split('/').pop();
                expect(hash).toHaveLength(config.hashLength);
            })));
    });

    test('should respond with error when exception occurs', () => {
        jest.doMock('keyv', () => jest.fn(() => ({
            get: () => Promise.resolve(false),
            set: () => Promise.reject()
        })));
        const newApp = require('../../src/loaders/restana')();
        const newServer = newApp.getServer();
        return request(newServer)
            .post('/code')
            .send({ code: data.testStrings[0] })
            .expect('Content-Type', /json/)
            .expect(500)
            .expect(({ body }) => {
                expect(body).toEqual(errorMsg.UNKNOWN_ERROR);
            });
    });

    test('should check for empty body', () => request(server)
        .post('/code')
        .send({ code: '' })
        .expect('Content-Type', /json/)
        .expect(400)
        .expect(({ body }) => {
            expect(body).toEqual(errorMsg.INVALID_REQUEST);
        }));

    test('should check for invalid body', () => request(server)
        .post('/code')
        .send({ random_property: 'RANDOM' })
        .expect('Content-Type', /json/)
        .expect(400)
        .expect(({ body }) => {
            expect(body).toEqual(errorMsg.INVALID_REQUEST);
        }));

    afterAll(() => {
        server.close();
    });
});
