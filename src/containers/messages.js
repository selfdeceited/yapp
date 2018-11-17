import { connect } from 'react-redux'
import { addChatMessage, addModerator } from '../actions/index'
import Messages from '../presentational/messages'
import SocketConnection from '../services/socketConnection'
import * as R from 'ramda';
import { typingDefault } from "../services/utils"

const mapStateToProps = state => R.pick(
  ['messages', 'username', 'moderatorExists', 'isModerator', 'description']
  , state)

const applyEstimation = (event, username, dispatch) => {
    const message = event.target.value

    if (isNaN(parseFloat(message))) { //todo: enhance & move to reducers
      event.target.value = ''
      return
    }

    dispatch(addChatMessage({
      username: username,
      body: message,
      isLog: false
    }))

    SocketConnection.instance.socket.emit('new estimation', message)

    event.target.value = ''
}

const claimModerator = (username, dispatch) => {
  dispatch(addModerator({ username }))
  SocketConnection.instance.socket.emit('new moderator', username)
}

const mapDispatchToProps = dispatch => {
  return {
    startTyping: typingDefault(applyEstimation, dispatch),
    claimModerator: username => claimModerator(username, dispatch),
    finishEstimation: () => finishEstimation(dispatch)
  }
}

const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(Messages)

export default MessagesContainer

// todo: push all socket emittions to reducer!
// (BL is spreaded between several places; it's not what we desire)
