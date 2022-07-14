
const { PrismaClient, Prisma } = require('@prisma/client');
const auth = require('../services/auth.service');
const createError = require('http-errors');
require('dotenv').config()
const jwt = require('jsonwebtoken')

class AuthController {
    static register = async (req, res, next) => {
        try {

            const user = await auth.register(req.body);

            res.status(200).json({
                status: true,
                message: 'User created successfully',
                data: user
            })
        }
        catch (e) {
            console.log(e)
            next(createError(e.statusCode, e.message))
        }
    }
    static login = async (req, res, next) => {
        console.log('Login Service Requested')
        try {
            const data = await auth.login(req.body)
            res.status(200).json({
                status: true,
                message: "Account login successful",
                data: data
            })
        } catch (e) {
            console.log("error at login!")
            console.log(e)
            next(createError(e.statusCode, e.message))
        }
    }
}
module.exports = AuthController;