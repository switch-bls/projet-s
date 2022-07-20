
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

    test('GET /user/id --> specific user by ID', async () => {
        const response = await request(app)
            .get('/user/id/69')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) =>

                expect.objectContaining({
                    firstname: expect.any(String),
                    lastname: expect.any(String),

                })
            );
    })

    test('GET /user/id --> 404 IF NOT FOUND', async () => {
        const response = await request(app)
            .get('/user/id/0')
            .expect('Content-Type', /json/)
            .expect(404)
    })

    test('POST /auth --> create user', async () => {
        const response = await request(app)
            .post('/auth')
            .send(user2)
            .expect('Content-Type', /json/)
            .expect(201)
            .then((response) =>
                expect.arrayContaining([
                    expect.objectContaining({
                        firstname: expect.any(String),
                        lastname: expect.any(String),
                    })
                ]));

    }
    )

    test('POST /auth/login --> login user', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send(user2)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                accessToken = response.body.data.accessToken,
                    expect.objectContaining({
                        firstname: expect.any(String),
                        lastname: expect.any(String),

                    })
            }
            );
    }
    )


    test('POST /auth --> create user', async () => {
        const response = await request(app)
            .post('/auth')
            .send(user2)
            .expect('Content-Type', /json/)
            .expect(409)
            .then((response) =>
                expect.arrayContaining([
                    expect.objectContaining({
                        firstname: expect.any(String),
                        lastname: expect.any(String),
                    })
                ]));

    }
    )


    test('GET /user/me --> get current user', async () => {
        var {email}= user2
        const response = await request(app)
            .get('/user/me')
            .auth(accessToken, { type: 'bearer' })
            .expect(200)
            .then((res) =>
                expect({email :res.body.data.email}).toEqual({
                    email
                }) 
            );
    })

    test('PUT /user --> update current user', async () => {
        const response = await request(app)
            .put('/user/')
            .auth(accessToken, { type: 'bearer' })
            .send(user2_to_update)
            .expect('Content-Type', /json/)
            .expect(200)
    })

    

    test('GET /user/me --> get current user', async () => {
        var {email}= user2_to_update
        const response = await request(app)
            .get('/user/me')
            .auth(accessToken, { type: 'bearer' })
            .expect(200)
            .then((res) =>
                expect({email :res.body.data.email}).toEqual({
                    email
                }) 
            );
    })




    test('DELETE /user --> delete user', async () => {
        const response = await request(app)
            .delete('/user')
            .auth(accessToken, { type: 'bearer' })
            .expect('Content-Type', /json/)
            .expect(200)
    })





})

server.close()