const { PrismaClient } = require('@prisma/client')
const express = require('express');
const app = express();
const path = require('path')
const bodyParser = require('body-parser');
const router = require('./routes/index')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const prisma = new PrismaClient()

require('dotenv').config()
app.use('/',router);

const port = process.env.PORT;
app.listen(port, ()  => {
    console.log('server is running on port '+ port);
});

async function main() {

}

main()
  .catch((e) => {
    console.log(e);
  })

  .finally(async () => {
    await prisma.$disconnect()
  })

module.exports = app;