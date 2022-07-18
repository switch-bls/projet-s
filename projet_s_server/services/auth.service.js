// services/auth.service.js
const createError = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');

class AuthService {

    constructor(userRepository){
        console.log('auth service created')
        this.userRepository = userRepository
    }

    async register(data) {
        console.log('Register Service Requested')
        const { email } = data;
        try {
            data.password = bcrypt.hashSync(data.password, 8)
            await this.userRepository.create(data)
            const user = await this.userRepository.findByEmail(email)
            data.accessToken = await jwt.signAccessToken(user)
        } catch (error) {
            console.log(error)
            throw error
        }
        return data;
    }

    async login(data) {
        console.log('Login Service Requested')
        
        const { email, password } = data;
        const user_to_login = await this.userRepository.findByEmail(email)
        console.log(user_to_login)
        this.checkpassword(password, user_to_login.password)
        delete user_to_login.password
        const accessToken = await jwt.signAccessToken(user_to_login)
        return { ...user_to_login, accessToken }
    }

    checkpassword(password_to_try, encrypted_password){
        const checkPassword = bcrypt.compareSync(password_to_try, encrypted_password)
        if (!checkPassword) throw createError.Unauthorized('Email address or password not valid')
    }

}

module.exports = AuthService;

