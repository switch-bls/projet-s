const createError = require('http-errors');
require('dotenv').config()
const jwt = require('../utils/jwt');

class UserController {

    constructor(userService) {
        console.log('user controller created')
        this.userService = userService
        
    }

    all = async (req, res, next) => {
        try {
            console.log('All Users Getter Service Requested')
            const users = await this.userService.all();
            res.status(200).json({
                status: true,
                message: 'All users',
                data: users
            })
            console.log('All Getter Service Requested')
        }
        catch (e) {
            console.log(e)
            next()
        }
    }

    userById = async (req, res, next) => {
        try {
            console.log('User Getter Service Requested')
            var id = req.params.id

            const user = await this.userService.userById(id);
            res.status(200).json({
                status: true,
                message: 'User info',
                data: user
            })
        }
        catch (e) {
            console.log(e)
            next()
        }
    }

    me = async (req, res, next) => {
        try {
            console.log('Current User Getter Service Requested')
            const data = jwt.getDataFromToken(req.headers.authorization)
            console.log(data)
            const me = await this.userService.userById(data.payload.id);
            res.status(200).json({
                status: true,
                message: 'My info',
                data: me
            })

        }
        catch (e) {
            console.log(e)
            next()
        }
    }

    update = async (req, res, next) => {
        try {
            const logged_user_id = jwt.getDataFromToken(req.headers.authorization).payload.id

            console.log(logged_user_id + ': User Update Service Requested')

            const user_to_update = await this.userService.update(logged_user_id, req.body);
            res.status(200).json({
                status: true,
                message: 'User info Succesfully updated',
                data: user_to_update
            })
        }
        catch (e) {
            console.log(e)
            next()
        }
    }

     delete = async (req, res, next) => {
        try {
            console.log('User Deletion Service Requested')
            const id_to_delete = jwt.getDataFromToken(req.headers.authorization).payload.id
            await user.deleteById(id_to_delete);
            res.status(200).json({
                status: true,
                message: 'User Succesfully Deleted',
            })
        }
        catch (e) {
            console.log(e)
            next()
        }
    }
}
module.exports = UserController;