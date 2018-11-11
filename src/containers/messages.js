import { connect } from 'react-redux'
import { addChatMessage, addModerator } from '../actions/index'
import Messages from '../presentational/messages'
import SocketConnection from '../services/socketConnection'
import * as R from 'ramda';

const mapStateToProps = state => R.pick(
  ['messages', 'username', 'moderatorExists', 'isModerator', 'description']
  , state)

const applyEstimation = (event, username, dispatch) => {
    const message = event.target.value

    if(isNaN(parseFloat(message))) { //todo: enhance & move to reducers
      event.target.value = ''
      return
    }

    dispatch(addChatMessage({
      username: username,
      body: message,
      isLog: false
    }))
    
    SocketConnection.instance.socket.emit('new estimation', message)

    const finishedMessage = `${username} has finished estimation`
    dispatch(addChatMessage({
      username: username,
      body: finishedMessage,
      isLog: true
    }))

    SocketConnection.instance.socket.emit('estimation sent', message)
    event.target.value = ''
}

const applyDescription = (event, username, dispatch) => {
  const message = event.target.value
  dispatch(addChatMessage({
    username: username,
    body: message,
    isLog: true,
    isDescription: true
  }))
  
  SocketConnection.instance.socket.emit('new issue', message);
  event.target.value = ''
}

const finishEstimation = dispatch => {
  SocketConnection.instance.socket.emit('finish estimation')
}

const claimModerator = (username, dispatch) => {
    dispatch(addModerator({ username }))
    SocketConnection.instance.socket.emit('new moderator', username)
}

const mapDispatchToProps = dispatch => {
  return {
    startTyping: (e, username) => {
        if (e.key === "Enter") {
          applyEstimation(e, username, dispatch)
        }
    },
    claimModerator: username => claimModerator(username, dispatch),
    startTypingDescription: (e, username) => {
      if (e.key === "Enter") {
        applyDescription(e, username, dispatch)
      }
    },
    finishEstimation: () => finishEstimation(dispatch)
  }
}

const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(Messages)

export default MessagesContainer

// todo: push all socket emittions to reducer!
// (BL is spreaded between several places; it's not what we desire)
