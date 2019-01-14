const ObjectStore = require("../stores/objectStore")
const VoteSessionStore = require("../stores/voteSessionStore")
const config = require("../config")
const moderator = require("./moderator")
const { users } = require("./users")

const voteSession = new VoteSessionStore()

const invokeFinishEstimation = function(socket)
{
   const actionName = 'finish estimation'
   console.log(actionName + " for " + voteSession.issueDescription)
    const emitResult = { voteResults: voteSession.get() }

    socket.emit(actionName, emitResult)
    socket.broadcast.emit(actionName, emitResult)

    voteSession.invalidate()
}

const finishEstimation = function(socket) {
  socket.on('finish estimation', function() {
    invokeFinishEstimation(socket)
  })
}

// TODO: generic message is weak and rigid, rework
const newMessageGeneric = function(actionName, messageAction) {
  return function(socket) {
    socket.on(actionName, function(data) {
      const result = {
        username: socket.username,
        message: data
      }
      console.log(actionName)

      if (!messageAction){
        throw new Error("messageAction desired")
      }

      if (messageAction.do) {
        messageAction.do(socket, result)
      }
      
      if (messageAction.broadcast) {
        socket.broadcast.emit(actionName, result)
      }
    })
  }
}

const newMessage = newMessageGeneric('new message', { broadcast: true } )

const newIssue = newMessageGeneric('new issue', {
  broadcast: true,
  do: (socket, result) => {
    const description = result.message
    voteSession.start(description)
    console.info("new estimation session started: " + description)
  }
})

const newEstimation = newMessageGeneric('new estimation', 
{
  broadcast: false,
  do: (socket, result) =>  {
    result = Object.assign(result, { intent: "new" })

    if (voteSession.get() === undefined) {
      console.error(`voting session is closed, please ask moderator to set the description`)
      return
    }

    if (!voteSession.containsVoteFor(result.username)) {
      voteSession.store(result)
    }
    else if(config.editAllowed)
    {
      voteSession.editResultFor(result.username, result)
      result.intent = "edit"
    } else {
      socket.emit('log', {message: 're-voting is prohibited by current config'})
      return
    }

    socket.broadcast.emit('user estimated', result)

    if (voteSession.get().length === users.get().length) {
      const finishMessage = { message: 'voting completed!'}
      socket.emit('log', finishMessage)
      socket.broadcast.emit('log', finishMessage)
      if (config.voteautocompletion)
        invokeFinishEstimation(socket)
    }
  }
})

const addUser = function(socket, userStatus) {
  socket.on('add user', function(username) {
    console.log('add user ' + username)
    if (users.exists(username)) {
      const message = `username ${username} already exists`
      console.error(message)
      return
    }
    
    let user = userStatus.get()
    if (user)
      return

    socket.username = username

    userStatus.set(true)
    users.add({username, isModerator: false})

    let numUsers = users.count()
    socket.emit('login', { numUsers, moderatorExists: users.moderatorExists() })
    socket.broadcast.emit('user joined', { username: socket.username, numUsers })
  })
}

const disconnect = function(socket, userStatus) {
  socket.on('disconnect', function() {
    console.log(socket.username + ' disconnected')
    let numUsers = users.count()
    let user = userStatus.get()

    if (!user)
      return
    
    --numUsers
    if (numUsers === 0)
      voteSession.invalidate()

    users.remove(socket.username)

    socket.broadcast.emit('user left', { username: socket.username, numUsers })
  })
}

const init = function(io) {
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

    const userStatus = new ObjectStore(false)

    const plain = [newMessage, newIssue, newEstimation, 
      finishEstimation, moderator.newModerator]
    plain.map(s => s(socket))

    const withStatus = [addUser, disconnect]
    withStatus.map(s => s(socket, userStatus))
  })
}

module.exports = { init }

// TODO: refactor & add tests