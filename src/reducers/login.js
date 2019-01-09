import { actionTypes } from "../actions/index"
import { add } from "./pureActions"


export const login = (state, action) => [
    { 
      name: actionTypes.connected,
      fn: add({ connected: true })
    },
    {
      name: actionTypes.setUsername,
      fn: add({username: action.username, logged_in: true })
    }
]