import { actionTypes } from "../actions/index"
import { add, addWithAction } from "./pureActions"
import SocketConnection from "../services/socketConnection"

export const login = (state, action) => [
    { 
      name: actionTypes.connected,
      fn: add({ connected: true })
    },
    {
      name: actionTypes.setUsername,
      fn: addWithAction({username: action.username, logged_in: true }, () => {
        if (!state.username)
          SocketConnection.instance.socket.emit('add user', action.username)
      })
    }
]