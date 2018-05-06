import { connect } from 'react-redux'
import Main from '../presentational/main'

const mapStateToProps = state => {
  return {
      showLogin: !state.logged_in
  }
}

const mapDispatchToProps = dispatch => ({});

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main)

export default MainContainer