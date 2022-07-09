
const { eventEmitter, Events } = require('../../utils/eventEmitter');
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();
const createError = require('http-errors');

require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('../../utils/jwt');


class RegistrationService {
    constructor() {
        this.initializeEventListeners();
      }

    initializeEventListeners() {
        eventEmitter.on(Events.USER_REGISTRATION, async ({ data }) => {
            const { email } = data;
            data.password = bcrypt.hashSync(data.password, 8);
            try{
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
        )
    }
}

module.exports = RegistrationService;