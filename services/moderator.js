const { users } = require("./users")

const newModerator = function(socket) {
    const actionName = 'new moderator'
    socket.on(actionName, function() {
      if (!socket.username) {
        console.error("username not set, exiting")
        return
      }
      
      if (users.moderatorExists()) {
        console.error("moderator already exists")
        return
      }
  
      console.log("setting moderator for " + socket.username)
      users.getBy(socket.username).isModerator = true
  
      socket.emit(actionName, { username: socket.username })
      socket.broadcast.emit(actionName, { username: socket.username })
    })
}

module.exports = { newModerator }
