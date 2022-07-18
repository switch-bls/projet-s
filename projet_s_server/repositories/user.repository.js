const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();
const createError = require('http-errors');

class UserRepository {
     async findAll(){};

     async findByEmail(email){};

     async findByID(id){};

     async create(user_data){};

     async delete(id){};

     async update(id, user_data){};
}

module.exports = UserRepository;
