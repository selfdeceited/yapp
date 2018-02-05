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
      // we tell the client to execute 'new message'
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
    
        // we store the username in the socket session for this client
        socket.username = username
        ++numUsers
        addedUser = true
        counter.emit(numUsers)
        userAddedStatus.emit(addedUser)

        console.log(`emit login. users: ${numUsers}, addedUser: ${addedUser}`)
        socket.emit('login', { numUsers: numUsers })

        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
          username: socket.username,
          numUsers: numUsers
        })
      })
}

const typing = function(socket) {
  socket.on('typing', function() {
      socket.broadcast.emit('typing', {
        username: socket.username
      })
    })
}

const stopTyping = function(socket) {
  socket.on('stop typing', function() {
      socket.broadcast.emit('stop typing', {
        username: socket.username
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
        
        console.log(`emit user left. users: ${numUsers}, addedUser: ${addedUser}`)
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
        typing(socket)
        stopTyping(socket)
        disconnect(socket, userAddedStatus)
      })
}

module.exports = { init }