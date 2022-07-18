// services/auth.service.js
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();
const createError = require('http-errors');
require('dotenv').config()
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');


class UserService {

    constructor(userRepository ) {
        console.log('user service created')
        this.userRepository = userRepository
    }

    //return all the users
    async all() {
        const allUsers = await this.userRepository.findAll()
        return allUsers;
    }

    //return the user
     async userById(id) {
        console.log('id: ' +id )
        const user = await this.userRepository.findByID(id)
        console.log(user)
        return user;
    }

    //return the user
     async userByEmail(email) {
        const user = await this.userRepository.findByEmail(email)
        console.log(user)
        return user;
    }

    //create a new user
     async create(data) {
        await this.userRepository.create(data)
    }

    //update a new user
     async update(id, data) {
        await this.userRepository.update(id, data)
    }

    //delete the user
     async deleteById(id) {
        await this.userRepository.delete(id)
    }
}

module.exports = UserService;

