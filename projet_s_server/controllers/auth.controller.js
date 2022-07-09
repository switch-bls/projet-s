const auth = require('../services/auth.service');
const createError = require('http-errors');
require('dotenv').config();
const jwt = require('jsonwebtoken')

class authController {
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
            next(console.log(e.statusCode, e.message))
        }
    }
    static login = async (req, res, next) => {
         try {
            const data = await auth.login(req.body)
            res.status(200).json({
                status: true,
                message: "Account login successful",
                data
            })
            console.log('Login Service Requested')
        } catch (e) {
            next(console.log(e.statusCode, e.message))
        }
    }
    static all = async (req, res, next) => {
        try {
            const users = await auth.all();
            res.status(200).json({
                status: true,
                message: 'All users',
                data: users
            })
            console.log('All Getter Service Requested')
        }
        catch (e) {
            next(console.log(e.statusCode, e.message))
        }
    }

    static me = async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1]
            const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
            const data = jwt.verify(token, accessTokenSecret)

            const me = await auth.me(data.payload.id);
            res.status(200).json({
                status: true,
                message: 'My info',
                data: me
            })
            console.log('Current User Getter Service Requested')
        }
        catch (e) {
            next(console.log(e.statusCode, e.message))
        }
    }
}
module.exports = authController;