const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();
const createError = require('http-errors');
const UserRepository = require('./user.repository')

class UserRepositoryImpl extends UserRepository {

    constructor() {
        super()
        console.log('user repository created')
    }


    async findAll() {
        return await prisma.user.findMany();
    }

    async findByEmail(email) {
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        });
        if (!user) {
            console.log('User not registered')
            throw createError.NotFound('User not registered')
        }
        return user
    }

    async findByID(id) {
        const user = await prisma.user.findFirst({
            where: {
                id: parseInt(id)
            }
        });
        if (!user) {
            console.log('User not registered')
            throw createError.NotFound('User not registered')
        }
        return user
    }

    async create(user_data) {
        try {
            const user_to_create = await prisma.user.create({
                data: user_data
            })
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    throw createError(409,
                        'There is a unique constraint violation, a new user cannot be created with this email'
                    )
                }
                else {
                    throw e
                }
            }
        }
    }

    async delete(id) {
        try {
            await prisma.user.delete({
                where: {
                    id: id,
                }
            })
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    async update(id, data) {
        try {
            await prisma.user.update({
                where: {
                    id: id,
                },
                data
            })
        } catch (e) {
            throw e
        }
    }
}

module.exports = UserRepositoryImpl