import { connect } from 'react-redux'
import { addChatMessage, finishEstimation } from '../actions/index'
import ModeratorActions from '../presentational/moderatorActions'
import { typingDefault } from "../services/utils"

import * as R from 'ramda';

const mapStateToProps = state => R.pick(['isModerator', 'username', 'description'], state)

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

  event.target.value = ''
}


const completeEstimation = finishEstimation

const mapDispatchToProps = dispatch => ({
    finishEstimation: () => dispatch(completeEstimation()),
    startTypingDescription: typingDefault(applyDescription, dispatch)
})

const ModeratorActionsContainer = connect(mapStateToProps, mapDispatchToProps)(ModeratorActions)

export default ModeratorActionsContainer