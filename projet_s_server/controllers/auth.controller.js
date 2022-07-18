const createError = require('http-errors');
require('dotenv').config()

class AuthController {

    constructor(authService) {
        console.log('auth controller created')
        this.authService = authService
    }

    register = async (req, res, next) => {
        try {
            const user = await this.authService.register(req.body);

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

    login = async (req, res, next) => {
        try {
            const data = await this.authService.login(req.body)
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