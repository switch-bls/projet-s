
const { response, application } = require('express')
const request = require('supertest')
const app = require('../app')

const jwt = require('../utils/jwt');

user = {
    "firstname" : "Alice",
    "lastname" : "Bumbstead",
    "password" : "qwertyuiop",
    "email" : "aliceb@mail.com",
    "pseudo" : "al50"
}

const accessToken = jwt.signAccessToken( user )
console.log(accessToken)

describe('Todos API', () => {
    it('GET /user/all --> array of users', async () => {
        const response = await request(app)
            .get('/user/all')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) =>
                expect.arrayContaining([
                    expect.objectContaining({
                        firstname: expect.any(String),
                        lastname: expect.any(String),
                    })
                ]));

    })

    it('GET /user/id --> specific user by ID', async () => {
        const response = await request(app)
            .get('/user/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) =>
                expect.arrayContaining([
                    expect.objectContaining({
                        firstname: expect.any(String),
                        lastname: expect.any(String),

                    })
                ]));
    })

    it('GET /user/id --> 404 IF NOT FOUND', () => {

    })

    it('POST /auth --> create user', () => {

    })

    it('GET /me --> get current user', () => {

    })

})
