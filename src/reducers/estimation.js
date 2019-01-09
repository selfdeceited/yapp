import { actionTypes } from "../actions/index"
import { addWithCheck } from "./pureActions"

export const estimation = (state, action) => [
  {
    name: actionTypes.addChatMessage,
    fn: addWithCheck(action.message && state.connected, () => 
      ({
        messages: state.messages.concat([action.message]), 
        description: action.message.isDescription ? action.message.body : state.description
      }))
  },
  {
    name: actionTypes.finishEstimation,
    fn: addWithCheck(action.estimationResult && state.connected, () =>
      ({
        description: undefined,
        messages: state.messages.concat(action.estimationResult.map(
          x =>({username: x.username, body: x.message, isLog: false, isDescription: false})))
      }))
  }
]