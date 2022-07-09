const events = require('events');
module.exports = {
  Events: {
    USER_REGISTRATION: 'user-registration',
    USER_GETME: 'user-me',
    USER_LOGIN: 'user-login',
    USER_ALL: 'user-all',
  },
  eventEmitter: new events.EventEmitter()
}