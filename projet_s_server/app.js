const { PrismaClient } = require('@prisma/client')
const express = require('express');
const app = express();
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


const prisma = new PrismaClient()


const route = require('./routes');
const { register } = require('./services/auth.service');
const RegistrationService = require('./subscribers/user/register');
const GetMyUserService = require('./subscribers/user/me');
app.use('/', route);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

async function main() {
  initializeServices()
}

main()
  .catch((e) => {
    throw e
  })

  .finally(async () => {
    await prisma.$disconnect()
  })

  function initializeServices() {
    new RegistrationService();
    new GetMyUserService();
  }
