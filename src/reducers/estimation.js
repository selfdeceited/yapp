import { actionTypes } from "../actions/index"
import { addWithCheck, addWithCheckAndAction, noChanges } from "./pureActions"
import SocketConnection from "../services/socketConnection"

export const estimation = (state, action) => [
  {
    name: actionTypes.addChatMessage,
    fn: addWithCheckAndAction(action.message && state.connected,
      () => ({
        messages: state.messages.concat([action.message]), 
        description: action.message.isDescription ? action.message.body : state.description
      }),
      () => 
      {
        if (action.message.isDescription && state.isModerator)
          SocketConnection.instance.socket.emit('new issue', action.message.body)
        else if (!action.message.isLog)
          SocketConnection.instance.socket.emit('new estimation', action.message.body)
      })
  },
  {
    name: actionTypes.estimationCompleted,
    fn: addWithCheck(action.estimationResult && state.connected, () =>
      ({
        description: undefined,
        messages: state.messages.concat(action.estimationResult.map(
          x =>({username: x.username, body: x.message, isLog: false, isDescription: false})))
      }))
  },
  {
    name: actionTypes.finishEstimation,
    fn: (state, action) => {
      SocketConnection.instance.socket.emit('finish estimation')
      return noChanges(state, action)
    }
  }
]