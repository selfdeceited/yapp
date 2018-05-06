class ClosureWrapper {
  constructor(data){
    this.data = data;
  }
  emit(data) {
    this.data = data
  }
  get() {
    return this.data
  }
}

const counter = new ClosureWrapper(0)

const newMessage = function(socket) {
  socket.on('new message',  data => {
      socket.broadcast.emit('new message', {
        username: socket.username,
        message: data
      })
    })
}

const addUser = function(socket, userAddedStatus) {
    socket.on('add user', function(username){
        let numUsers = counter.get()
        let addedUser = userAddedStatus.get()
        if (addedUser) return

        socket.username = username
        ++numUsers
        addedUser = true

        counter.emit(numUsers)
        userAddedStatus.emit(addedUser)

        socket.emit('login', { numUsers: numUsers })
        socket.broadcast.emit('user joined', {
          username: socket.username,
          numUsers: numUsers
        })
      })
}

const disconnect = function(socket, userAddedStatus){
  socket.on('disconnect', function() {
      let numUsers = counter.get()
      let addedUser = userAddedStatus.get()
      if (addedUser) {
        --numUsers
        counter.emit(numUsers)
        
        socket.broadcast.emit('user left', {
          username: socket.username,
          numUsers: numUsers
        })
      }
    })
}

const init = function(io){
    io.on('connection', function(socket) {
        const userAddedStatus = new ClosureWrapper(false)
        newMessage(socket)
        addUser(socket, userAddedStatus)
        disconnect(socket, userAddedStatus)
      })
}

module.exports = { init }