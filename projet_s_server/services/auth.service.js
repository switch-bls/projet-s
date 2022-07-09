// services/auth.service.js
const { eventEmitter, Events } = require('../utils/eventEmitter');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const createError = require('http-errors');

require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');

class AuthService {
    static async register(data) {
        eventEmitter.emit(Events.USER_REGISTRATION, {data})
    }

    static async login(data) {
        const { email, password } = data;
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        });
        if (!user) {
            throw createError.NotFound('User not registered')
        }
        const checkPassword = bcrypt.compareSync(password, user.password)
        if (!checkPassword) throw createError.Unauthorized('Email address or password not valid')
        delete user.password
        const accessToken = await jwt.signAccessToken(user)
        return { ...user, accessToken }
    }
    static async all() {
        const allUsers = await prisma.user.findMany();
        return allUsers;
    }

    static async me(myid) {
        eventEmitter.emit(Events.USER_GETME, {myid})
    }
    
}

module.exports = AuthService;

