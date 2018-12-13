import { connect } from 'react-redux'
import { addModerator } from '../actions/index'
import Messages from '../presentational/messages'
import SocketConnection from '../services/socketConnection'
import * as R from 'ramda';

const mapStateToProps = state => R.pick(
  ['messages', 'username', 'moderatorExists']
  , state)

const claimModerator = (username, dispatch) => {
  dispatch(addModerator({ username }))
  // TODO: move socket emittion to reducer!
  SocketConnection.instance.socket.emit('new moderator', username)
}

const mapDispatchToProps = dispatch => {
  return {
    claimModerator: username => claimModerator(username, dispatch),
  }
}

const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(Messages)

export default MessagesContainer