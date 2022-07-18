
const UserController = require('./controllers/user.controller')
const AuthController = require('./controllers/auth.controller')
const UserService = require('./services/user.service')
const AuthService = require('./services/auth.service')
const UserRepositoryImpl = require('./repositories/user.repositoryImpl')


const awilix = require('awilix')

// Create the container and set the injectionMode to PROXY (which is also the default).
const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.CLASSIC
})

container.register({

    userRepository: awilix.asClass(UserRepositoryImpl),
    userService: awilix.asClass(UserService),
    userController: awilix.asClass(UserController),
    authService: awilix.asClass(AuthService),
    authController: awilix.asClass(AuthController),
  })

module.exports = container

