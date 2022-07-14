// services/auth.service.js
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();
const createError = require('http-errors');
require('dotenv').config()
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');

class UserService {
    //return all the users
    static async all() {
        const allUsers = await prisma.user.findMany();
        return allUsers;
    }

    //return the user
    static async userById(id) {
        console.log(id + ' id')
        const user = await prisma.user.findFirst({
            where: {
                id: parseInt(id)
            }
        });
        console.log(user)
        return user;
    }

    //return the user
    static async userByEmail(email) {
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        });
        if (!user) {
            console.log('User not registered')
            throw createError.NotFound('User not registered')
        }
        console.log(user)
        return user;
    }

    //create a new user
    static async create(data) {
        try {
            await prisma.user.create({
                data
            })
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    throw createError(409,
                        'There is a unique constraint violation, a new user cannot be created with this email'
                    )
                }
            }
        }
    }

    //update a new user
    static async update(id, data) {
        data.id = id
        delete data.password
        delete data.email
        try {
            await prisma.user.update({
                where: {
                    id : data.id,
                  },
                data
            })
        } catch (e) {
            throw e
        }
    }

    //delete the user
    static async deleteById(id) {
        try {
            await prisma.user.delete({
                where: {
                    id : id,
                  }
            })
        } catch (e) {
            console.log(e)
            throw e
        }
    }
}

module.exports = UserService;

