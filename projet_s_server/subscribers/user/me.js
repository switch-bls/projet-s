
const { eventEmitter, Events } = require('../../utils/eventEmitter');
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();
const createError = require('http-errors');

require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('../../utils/jwt');


class GetMyUserService {
    constructor() {
        this.initializeEventListeners();
      }

    initializeEventListeners() {
        eventEmitter.on(Events.USER_GETME, async ({ myid }) => {
            console.log(myid)
            const me = await prisma.user.findFirst({
                where: {
                    id : myid
                }
            });
            console.log(me)
            return me;
        }
        )
    }
}

module.exports = GetMyUserService;