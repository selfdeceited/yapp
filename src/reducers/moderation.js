import { actionTypes } from "../actions/index"
import { add, addWithCheck } from "./pureActions"

export const moderation = (state, action) => [
  {
    name: actionTypes.moderatorSet,
    fn: add({ moderatorExists: true })
  },
  { 
    name: actionTypes.addModerator,
    fn: addWithCheck(state.connected, () => ({ isModerator: true }))
  }
]