const ObjectStore = require("../stores/objectStore")
const UserStore = require("../stores/userStore")
const VoteSessionStore = require("../stores/voteSessionStore")

const users = new UserStore()
const voteSession = new VoteSessionStore()

const newModerator = function(socket) {
  const actionName = 'new moderator'
  socket.on(actionName, function() {
    if (!socket.username) {
      console.error("username not set, exiting")
      return;
    }
    
    if (users.moderatorExists()) {
      const message = `moderator already exists`;
      console.error(message)
      return;
    }

    console.log("setting moderator for " + socket.username)
    socket.emit(actionName, { username: socket.username })
    socket.broadcast.emit(actionName, { username: socket.username })
    users.getBy(socket.username).isModerator = true
  })
}

const finishEstimation = function(socket){
  const actionName = 'finish estimation'
  socket.on(actionName, function() {
    console.log(actionName + " for " + voteSession.issueDescription)
    const emitResult = { voteResults: voteSession.get() }
    socket.emit(actionName, emitResult)
    socket.broadcast.emit(actionName, emitResult)
  
    voteSession.invalidate()
  })
}

// todo: generic message is weak and rigid, rework
const newMessageGeneric = function(actionName, estimationAction, newIssueAction) {
  return function(socket) {
    socket.on(actionName, function(data) {
      const result = {
        username: socket.username,
        message: data
      }

      console.log(actionName)

      if (newIssueAction)
        newIssueAction(data)

      if (estimationAction)
        estimationAction(socket, result)
      else
        socket.broadcast.emit(actionName, result)
    })
  }
}

const newMessage = newMessageGeneric('new message')

const newIssue = newMessageGeneric('new issue', undefined, function(description) {
  voteSession.start(description);
  console.info("new estimation session started: " + description)
})

const newEstimation = newMessageGeneric('new estimation', function(socket, emitResult) {
  let result = Object.assign(emitResult, { intent: "new" })

  if (voteSession.get() === undefined) {
    console.error(`voting session is closed, please ask moderator to set the description`)
    return
  }

  if (!voteSession.containsVoteFor(emitResult.username)){
    voteSession.store(emitResult)
  }
  else  // todo: switch to configurable condition if to allow replays or not!
  {
    voteSession.editResultFor(emitResult.username, emitResult)
    result.intent = "edit"
  }

  socket.broadcast.emit('user estimated', result)

  if (voteSession.get().length === users.get().length) {
    const finishMessage = { message: 'all people have voted, you can finish the estimation'}
    socket.emit('log', finishMessage)
    socket.broadcast.emit('log', finishMessage)
    // todo later: call finishEstimation(socket) directly?
  }
}, undefined)

const addUser = function(socket, userAddedStatus) {
  socket.on('add user', function(username) {
    console.log('add user ' + username)
    if (users.exists(username)){
      const message = `username ${username} already exists`;
      console.error(message)
      return;
    }
    let numUsers = users.count()
    let addedUser = userAddedStatus.get()
    if (addedUser) return

    socket.username = username
    ++numUsers
    addedUser = true

    userAddedStatus.set(addedUser)
    users.add({username, isModerator: false})

    socket.emit('login', { numUsers, moderatorExists: users.moderatorExists() })
    socket.broadcast.emit('user joined', { username: socket.username, numUsers })
  })
}

const disconnect = function(socket, userAddedStatus) {
  socket.on('disconnect', function() {
    console.log(socket.username + ' disconnected')
    let numUsers = users.count()
    let addedUser = userAddedStatus.get()
    if (addedUser) {
      --numUsers
      if (numUsers === 0)
        voteSession.invalidate()

      users.remove(socket.username)

      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      })
    }
  })
}

const init = function(io){
  io.on('connection', function(socket) {

    console.log("new connection")
    if (voteSession.issueDescription){
    console.log("setting up the description")
      socket.emit("new issue", {
        username: socket.username,
        message: voteSession.issueDescription
      })
    }
    else {
      socket.broadcast.emit('log', {
        message: 'waiting for moderator to define the issue'
      })
    }

    const userAddedStatus = new ObjectStore(false)

    const plain = [newMessage, newIssue, newEstimation, 
      finishEstimation, newModerator]
    plain.map(s => s(socket))
        
    const withStatus = [addUser, disconnect]
    withStatus.map(s => s(socket, userAddedStatus))
  })
}

module.exports = { init }

// todo: refactor & add tests