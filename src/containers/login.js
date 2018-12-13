import { connect } from 'react-redux'
import { setUsername } from '../actions/index'
import Login from '../presentational/login'
import SocketConnection from "../services/socketConnection"

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  startTyping: e => {
    if (e.key === "Enter") {
      const username = e.target.value.trim() // TODO: check for possible error
      if (!!username) {
        // TODO: move socket emission to reducer
        SocketConnection.instance.socket.emit('add user', username)
        
        dispatch(setUsername(username))
        document.title = 'YAPP - ' + username
      }
    }
  }
})

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login)

export default LoginContainer