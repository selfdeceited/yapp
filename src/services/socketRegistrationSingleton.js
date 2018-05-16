import SocketConnection from './socketConnection'
import * as R from 'ramda'

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
        return

    if (SocketRegistrationSingleton.registered)
        return

        const registrationActions = {
            'login': data => {
                self.connected()
                var message = "Welcome to YAPP!"
                self.log(message, {
                  prepend: true
                })
                self.addParticipantsMessage(data)
            },
            'new message': data => {
                self.addChatMessage({
                    username: data.username,
                    body: data.message,
                    isLog: false
                  })
            },
            'user joined': data => {
                self.log(data.username + ' joined')
                self.addParticipantsMessage(data)
            },
            'user left': data => {
                self.log(data.username + ' left')
                self.addParticipantsMessage(data)
            },
            'disconnect': () => self.log('you have been disconnected'),
            'reconnect': () => {
                self.log('you have been reconnected')
                if (self.getUsername()) {
                    self.socket.emit('add user', self.getUsername());
                }
            },
            'reconnect_error': () => self.log('attempt to reconnect has failed')
        }
        
        R.mapObjIndexed((fn, name, obj) => self.socket.on(name, fn), registrationActions) // todo: refactor even better
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