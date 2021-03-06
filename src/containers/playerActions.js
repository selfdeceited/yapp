import { connect } from 'react-redux'
import { addChatMessage } from '../actions/index'
import { typingDefault } from "../services/utils"
import PlayerActions from '../presentational/playerActions'

import * as R from 'ramda';

const mapStateToProps = state => R.pick(['moderatorExists', 'username', 'description'], state)

const applyEstimation = (event, username, dispatch) => {
  const message = event.target.value

  //TODO: enhance & move to reducer
  if (isNaN(parseFloat(message))) { 
    event.target.value = ''
    return
  }

  dispatch(addChatMessage({
    username: username,
    body: message,
    isLog: false
  }))

  event.target.value = ''
}

const mapDispatchToProps = dispatch => ({
  startTyping: typingDefault(applyEstimation, dispatch)
})

const PlayerActionsContainer = connect(mapStateToProps, mapDispatchToProps)(PlayerActions)

export default PlayerActionsContainer