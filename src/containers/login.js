import { connect } from 'react-redux'
import { setUsername } from '../actions/index'
import Login from '../presentational/login'
import SocketConnection from "../services/socketConnection"

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  startTyping: e => {
    if (e.key === "Enter") {
      const username = e.target.value.trim() // todo: check for possible error
      if (!!username) {
        SocketConnection.instance.socket.emit('add user', username)
        // todo: SocketConnection via redux
        dispatch(setUsername(username))
      }
    }
  }
})

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login)

export default LoginContainer