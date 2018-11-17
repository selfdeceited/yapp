import SocketConnection from './socketConnection'
import * as R from 'ramda'
import { store } from '../index'
import { moderatorSet, finishEstimation } from '../actions/index'

let singleton = Symbol()
let singletonEnforcer = Symbol()
let registrationEnforcer = Symbol()

class SocketRegistrationSingleton {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer)
       throw "Instantiation failed: use SocketRegistrationSingleton.instance instead of new.";
    }

  static get instance() {
    if (!this[singleton])
        this[singleton] = new SocketRegistrationSingleton(singletonEnforcer)
    return this[singleton]
  }
  
  static set instance(v) { throw "Can't change constant property!" }

  static get registered() {
    if (!this[registrationEnforcer]) {
        this[registrationEnforcer] = true
        return false
    }
    return true
  }
}

var self = SocketRegistrationSingleton.instance
self.socket = SocketConnection.instance.socket

self.register = () => {
    if (!self.connected || !self.addChatMessage || !self.getUsername)
        return

    if (SocketRegistrationSingleton.registered)
        return
        
        // todo: obj too tight, make it pure & distribute
        const registrationActions = {
            'login': data => {
                self.connected()
                var message = "Welcome to YAPP!"
                self.log(message, {
                  prepend: true
                })
                self.addParticipantsMessage(data)
                if (data.moderatorExists)
                    store.dispatch(moderatorSet())
            },
            'new message': data => {
                self.addChatMessage({
                    username: data.username,
                    body: data.message,
                    isLog: false
                  })
            },
            'new issue': data => {
                if (data.message)
                    self.addChatMessage({
                        username: data.username,
                        body: data.message,
                        isLog: true,
                        isDescription: true
                    })
            },
            'user estimated': data => {
                self.log(`${data.username} ${data.intent === 'edit' ? 're' : ''}estimated the issue`)
            },
            'new moderator' : data => {
                self.log(data.username + ' is now the moderator!')
                store.dispatch(moderatorSet())
            },
            'finish estimation' : data => {
                self.log('-------------------------------------------------')
                store.dispatch(finishEstimation(data.voteResults))
                self.log('-------------------------------------------------')

                if (!store.getState().isModerator)
                  self.log('waiting for moderator to set the new issue')
            },
            'log': data => {
                self.log(data.message)
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

        R.mapObjIndexed((fn, name, obj) => self.socket.on(name, fn), registrationActions)
}

self.addParticipantsMessage = data => {
    self.log(`there's ${data.numUsers} participant${data.numUsers === 1 ? '': 's'}`)
}

self.log = (message, options) => {
    self.addChatMessage({
      username: null,
      body: message,
      isLog: true
    })
}

export default SocketRegistrationSingleton