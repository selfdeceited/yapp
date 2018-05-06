import SocketConnection from './socketConnection'

export class SocketRegistration {
    self;
    constructor(getUsername, connected, addChatMessage) {
        self = this;

        self.getUsername = getUsername
        self.addChatMessage = addChatMessage

        self.socket = SocketConnection.instance.socket;

        self.registerLogin(connected);

        [self.registerNewMessage, self.registerReconnect, 
         self.registerReconnectError, self.registerUserJoined, self.registerUserLeft]
         .map(invoke => invoke.apply(self, null))
    }

    registerLogin(connected) {
        self.socket.on('login', function (data) {
            connected()
            var message = "Welcome to YAPP!"
            self.log(message, {
              prepend: true
            })
            self.addParticipantsMessage(data);
          })
    }

    registerNewMessage(){
        self.socket.on('new message', function (data) {
            self.addChatMessage({
              username: data.username,
              body: data.message,
              isLog: false
            })
          })
    }

    registerUserJoined() {
        self.socket.on('user joined', function (data) {
            self.log(data.username + ' joined');
            self.addParticipantsMessage(data)
          });
    }

    registerUserLeft() {
        self.socket.on('user left', function (data) {
            self.log(data.username + ' left')
            self.addParticipantsMessage(data)
          })
    }

    registerDisconnect(){
        self.socket.on('disconnect', function () {
            self.log('you have been disconnected');
          }.bind(this));
    }

    registerReconnect() {
        self.socket.on('reconnect', function () {
            self.log('you have been reconnected')
            if (self.getUsername()) {
              self.socket.emit('add user', self.getUsername());
            }
          })
    }

    registerReconnectError() {
        self.socket.on('reconnect_error', function () {
            self.log('attempt to reconnect has failed')
          });
    }

    addParticipantsMessage(data) {
        var message = '';
        if (data.numUsers === 1) {
          message += "there's 1 participant";
        } else {
          message += "there are " + data.numUsers + " participants";
        }
        self.log(message);
      }

    log(message, options) {
        self.addChatMessage({
          username: null,
          body: message,
          isLog: true
        })
    }
}