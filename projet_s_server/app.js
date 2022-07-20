const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes/index')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

require('dotenv').config()


app.use('/',router);

const server = app.listen(process.env.PORT, ()  => {
    console.log('Server is running on port '+ process.env.PORT);
});

process.on('uncaughtException', () => {server.close()})
process.on('exit', () => {server.close()})
process.on('SIGTERM', () => {server.close()})

module.exports = { app, server };