import { connect } from 'react-redux'
import { addModerator } from '../actions/index'
import Messages from '../presentational/messages'
import * as R from 'ramda';

const mapStateToProps = state => R.pick(
  ['messages', 'username', 'moderatorExists']
  , state)

const mapDispatchToProps = dispatch => {
  return {
    claimModerator: username => dispatch(addModerator({ username }))
  }
}

const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(Messages)

export default MessagesContainer