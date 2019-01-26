import socket from './socketConnection'
import * as R from 'ramda'
import { store } from '../index'
import { moderatorSet, estimationCompleted, addChatMessage, connected} from '../actions/index'

let self = {}

self.register = () => {
    if (store.getState().logged_in)
        return
        
        // TODO: obj too tight, make it pure & distribute
        const registrationActions = {
            'login': data => {
                store.dispatch(connected())
                var message = "Welcome to YAPP!"

                self.log(message, {
                  prepend: true
                })

                self.addParticipantsMessage(data)

                if (data.moderatorExists)
                    store.dispatch(moderatorSet())
            },
            'new message': data => {
                store.dispatch(addChatMessage({
                    username: data.username,
                    body: data.message,
                    isLog: false
                  }))
            },
            'new issue': data => {
                if (data.message)
                    store.dispatch(addChatMessage({
                        username: data.username,
                        body: data.message,
                        isLog: true,
                        isDescription: true
                    }))
            },
            'user estimated': data => {
                self.log(`${data.username} ${data.intent === 'edit' ? 're' : ''}estimated the issue`)
            },
            'new moderator' : data => {
                self.log(data.username + ' is now the moderator!')
                store.dispatch(moderatorSet())
            },
            'finish estimation' : data => {
                store.dispatch(estimationCompleted(data.voteResults))

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
                if (store.getState().username) {
                    socket.emit('add user', store.getState().username);
                }
            },
            'reconnect_error': () => self.log('attempt to reconnect has failed')
        }

        R.mapObjIndexed((fn, name, obj) => socket.on(name, fn), registrationActions)
}

self.addParticipantsMessage = data => {
    self.log(`there's ${data.numUsers} participant${data.numUsers === 1 ? '': 's'}`)
}

self.log = (message, options) => {
    store.dispatch(addChatMessage({
        username: null,
        body: message,
        isLog: true
      }))
}

export default self