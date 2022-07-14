// services/auth.service.js
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();
const createError = require('http-errors');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname + '/config/' + process.env.ENVIRONMENT + '.env') })
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');
const user = require('./user.service');

class AuthService {
    static async register(data) {
        const { email } = data;
        try {
            data.password = bcrypt.hashSync(data.password, 8)
            await user.create(data)
            data.accessToken = await jwt.signAccessToken(user);
        } catch (error) {
            console.log(error)
            throw error
        }
        
        
        
        return data;
    }

    static async login(data) {
        const { email, password } = data;
        const user_to_login = await user.userByEmail(email)
        this.checkpassword(password, user_to_login)
        delete user_to_login.password
        const accessToken = await jwt.signAccessToken(user_to_login)
        return { ...user_to_login, accessToken }
    }

    static checkpassword(password_to_try, user){
        const { password } = user
        const checkPassword = bcrypt.compareSync(password_to_try, password)
        if (!checkPassword) throw createError.Unauthorized('Email address or password not valid')
    }

}

module.exports = AuthService;

