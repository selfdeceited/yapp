const newMessage = socket => {
  socket.on('new message',  data => {
      // we tell the client to execute 'new message'
      socket.broadcast.emit('new message', {
        username: socket.username,
        message: data
      });
    });
}

const addUser = (socket, numUsers, addedUser) => {
    socket.on('add user', username => {
        if (addedUser) return;
    
        // we store the username in the socket session for this client
        socket.username = username;
        ++numUsers;
        addedUser = true;
        socket.emit('login', { numUsers: numUsers });

        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
          username: socket.username,
          numUsers: numUsers
        });
      });
}

const typing = socket => {
  socket.on('typing', () => {
      socket.broadcast.emit('typing', {
        username: socket.username
      });
    });
}

const stopTyping = socket => {
  socket.on('stop typing', () => {
      socket.broadcast.emit('stop typing', {
        username: socket.username
      });
    });
}

const disconnect = (socket, numUsers, addedUser) => {
  socket.on('disconnect', function () {
      if (addedUser) {
        --numUsers;
  
        // echo globally that this client has left
        socket.broadcast.emit('user left', {
          username: socket.username,
          numUsers: numUsers
        });
      }
    });
}

const init = io => {
    var numUsers = 0
    io.on('connection', socket => {
        var addedUser = false
        newMessage(socket)
        addUser(socket, numUsers, addedUser)
        typing(socket)
        stopTyping(socket)
        disconnect(socket, numUsers, addedUser)
      });
}

module.exports = { init }