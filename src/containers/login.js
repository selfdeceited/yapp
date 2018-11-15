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
        
        dispatch(setUsername(username))
        document.title = 'YAPP - ' + username
        // todo: SocketConnection via redux
        // introduce dispatch of socket emittions!
      }
    }
  }
})

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login)

export default LoginContainer