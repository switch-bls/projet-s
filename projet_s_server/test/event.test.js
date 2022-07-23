
const { response, application } = require('express')
const request = require('supertest')
const { app, server } = require('../app')
const jwt = require('../utils/jwt');

user = {
    "firstname": "Alice",
    "lastname": "Bumbstead",
    "password": "qwertyuiop",
    "email": "aliceb@mail.com",
    "pseudo": "al50"
}

user2 = {
    "firstname": "Marc",
    "lastname": "DuPont",
    "password": "1234",
    "email": "marc.d@mail.com",
    "pseudo": "marc7890"
}

user2_to_update= {
    "firstname": "Jean",
    "lastname": "DuPont",
    "email": "jean.d@mail.com",
    "pseudo": "jean7890"
}


var accessToken = "";

describe('Todos API', () => {

    test('GET /user/all --> array of users', async () => {
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
})

server.close()