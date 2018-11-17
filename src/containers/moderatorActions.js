import { connect } from 'react-redux'
import { addChatMessage } from '../actions/index'
import ModeratorActions from '../presentational/moderatorActions'
import SocketConnection from '../services/socketConnection'
import { typingDefault } from "../services/utils"

import * as R from 'ramda';

const mapStateToProps = state => R.pick(['isModerator', 'username', 'description'], state)

const finishEstimation = dispatch => {
  SocketConnection.instance.socket.emit('finish estimation')
}

const applyDescription = (event, username, dispatch) => {
  const message = event.target.value
  if (!message)
    return
  
  dispatch(addChatMessage({
    username: username,
    body: message,
    isLog: true,
    isDescription: true
  }))
    
  SocketConnection.instance.socket.emit('new issue', message);
  event.target.value = ''
}

const mapDispatchToProps = dispatch => ({
    finishEstimation: () => finishEstimation(dispatch),
    startTypingDescription: typingDefault(applyDescription, dispatch),
})

const ModeratorActionsContainer = connect(mapStateToProps, mapDispatchToProps)(ModeratorActions)

export default ModeratorActionsContainer