
import { connect } from 'react-redux'
import { addChatMessage } from '../actions/index'
import Deck from '../presentational/deck'

import * as R from 'ramda';

const mapStateToProps = state => R.pick(['username'], state)

const mapDispatchToProps = dispatch => ({
  estimate: (estimation, username) => dispatch(addChatMessage({
    username,
    body: estimation,
    isLog: false
  }))
})

const DeckContainer = connect(mapStateToProps, mapDispatchToProps)(Deck)

export default DeckContainer