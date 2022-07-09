// services/auth.service.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const createError = require('http-errors');

require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');

class AuthService {
    static async register(data) {
        const { email } = data;
        data.password = bcrypt.hashSync(data.password, 8);
        try {
            let user = await prisma.user.create({
                data
            })
            data.accessToken = await jwt.signAccessToken(user);
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    console.log(
                        'There is a unique constraint violation, a new user cannot be created with this email'
                    )
                }
            }
            throw e;
        }
        return data;
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
        const me = await prisma.user.findFirst({
            where: {
                id: myid
            }
        });
        console.log(me)
        return me;
    }

}

module.exports = AuthService;

