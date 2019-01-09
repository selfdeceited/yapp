import { connect } from 'react-redux'
import { setUsername } from '../actions/index'
import Login from '../presentational/login'

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  startTyping: e => {
    if (e.key === "Enter") {
      const username = e.target.value.trim() // TODO: check for possible error
      if (!!username) {
        dispatch(setUsername(username))
        document.title = 'YAPP - ' + username
      }
    }
  }
})

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login)

export default LoginContainer