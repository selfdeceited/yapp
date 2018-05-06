import { connect } from 'react-redux'
import { addChatMessage } from '../actions/index'
import Messages from '../presentational/messages'
import SocketConnection from '../services/socketConnection'

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    username: state.username
  }
}

const sendMessage = (event, username, dispatch) => {
    const message = event.target.value
    dispatch(addChatMessage({
      username: username,
      body: message,
      isLog: false
    }))
    
    SocketConnection.instance.socket.emit('new message', message);
    event.target.value = ''
}

const mapDispatchToProps = (dispatch) => {
  return {
    startTyping: (e, username) => {
        if (e.key === "Enter") {
            sendMessage(e, username, dispatch)
        }
    }
  }
}

const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(Messages)

export default MessagesContainer