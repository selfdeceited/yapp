import { connect } from 'react-redux'
import { addModerator } from '../actions/index'
import Voting from '../presentational/voting'
import * as R from 'ramda';

const mapStateToProps = state => R.pick(['messages', 'username', 'moderatorExists'] , state)

const mapDispatchToProps = dispatch => ({
    claimModerator: username => dispatch(addModerator({ username }))
})

const VotingContainer = connect(mapStateToProps, mapDispatchToProps)(Voting)

export default VotingContainer