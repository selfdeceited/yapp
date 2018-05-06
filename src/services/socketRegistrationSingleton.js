import SocketConnection from './socketConnection'

let singleton = Symbol();
let singletonEnforcer = Symbol();
let registrationEnforcer = Symbol();

class SocketRegistrationSingleton {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer)
       throw "Instantiation failed: use SocketRegistrationSingleton.instance instead of new.";
    }

  static get instance() {
    if (!this[singleton])
        this[singleton] = new SocketRegistrationSingleton(singletonEnforcer)
    return this[singleton];
  }
  
  static set instance(v) { throw "Can't change constant property!" }

  static get registered() {
    if (!this[registrationEnforcer]) {
        this[registrationEnforcer] = true;
        return false;
    } else return true;
  }
}

var self = SocketRegistrationSingleton.instance
self.socket = SocketConnection.instance.socket
self.register = () => {
    if (!self.connected || !self.addChatMessage || !self.getUsername)
        return;

    if (SocketRegistrationSingleton.registered)
        return;

    self.registerLogin()
    self.registerNewMessage()
    self.registerReconnect()
    self.registerReconnectError()
    self.registerUserJoined()
    self.registerUserLeft()
}

self.registerLogin = (connected) => {
    self.socket.on('login', function (data) {
        self.connected()
        var message = "Welcome to YAPP!"
        self.log(message, {
          prepend: true
        })
        self.addParticipantsMessage(data)
      })
}

self.registerNewMessage = () => {
    self.socket.on('new message', function (data) {
        self.addChatMessage({
          username: data.username,
          body: data.message,
          isLog: false
        })
      })
}

self.registerUserJoined = () => {
    self.socket.on('user joined', function (data) {
        self.log(data.username + ' joined')
        self.addParticipantsMessage(data)
      });
}

self.registerUserLeft = () => {
    self.socket.on('user left', function (data) {
        self.log(data.username + ' left')
        self.addParticipantsMessage(data)
      })
}

self.registerDisconnect = () => {
    self.socket.on('disconnect', function () {
        self.log('you have been disconnected')
      })
}

self.registerReconnect = () => {
    self.socket.on('reconnect', function () {
        self.log('you have been reconnected')
        if (self.getUsername()) {
          self.socket.emit('add user', self.getUsername());
        }
      })
}

self.registerReconnectError = () => {
    self.socket.on('reconnect_error', function () {
        self.log('attempt to reconnect has failed')
      })
}

self.addParticipantsMessage = (data) => {
    var message = ''
    if (data.numUsers === 1) {
      message += "there's 1 participant"
    } else {
      message += "there are " + data.numUsers + " participants"
    }
    self.log(message)
}

self.log = (message, options) => {
    self.addChatMessage({
      username: null,
      body: message,
      isLog: true
    })
}

export default SocketRegistrationSingleton;