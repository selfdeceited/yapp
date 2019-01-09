import { actionTypes } from "../actions/index"
import { add, addWithCheckAndAction } from "./pureActions"
import SocketConnection from "../services/socketConnection"

export const moderation = (state, action) => [
  {
    name: actionTypes.moderatorSet,
    fn: add({ moderatorExists: true })
  },
  { 
    name: actionTypes.addModerator,
    fn: addWithCheckAndAction(state.connected && state.username,
      () => ({ isModerator: true }),
      () => {
        SocketConnection.instance.socket.emit('new moderator', state.username)
      }
    )
  }
]