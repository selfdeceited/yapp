import * as R from 'ramda'
import { actionTypes } from "../actions/index"

// TODO: extract initial state to separate file - it's not part of the reducer's logic
export const initialState = {
  username: "",
  logged_in: false,
  messages: [],
  typing: false, 
  connected: true,
  lastTypingTime: null,
  isModerator: false,
  moderatorExists: false,
  description: undefined
}

const app = (state, action) => {
  if (state === undefined)
    state = initialState

  // TODO: refactor reducer logic (see below):
  // 1. extract pure functions: add, addWithCheck, noChanges, addWithAction
  // 2. extract areas by making them pure: const login = (action, state) => []
  // and here: 
  // const reducer = R.unnest([login, moderation, estimation].map(x => x(action, state)))
  //    .filter(x => x.name === action.type)[0]

  const add = stateChanges => (state, action) => R.merge(state, stateChanges)
  const noChanges = (state, action) => state
  const addWithCheck = (predicate, getStateChanges) => predicate ? add(getStateChanges()) : noChanges

  const login = [
    { 
      name: actionTypes.connected,
      fn: add({ connected: true })
    },
    {
      name: actionTypes.setUsername,
      fn: add({username: action.username, logged_in: true })
    }
  ]

  const moderation = [
    {
      name: actionTypes.moderatorSet,
      fn: add({ moderatorExists: true })
    },
    { 
      name: actionTypes.addModerator,
      fn: addWithCheck(state.connected, () => ({ isModerator: true }))
    }
  ]

  const estimation = [
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

  const reducer = R.reduce(R.concat, [], [login, moderation, estimation])
    .filter(x => x.name == action.type)[0]

  return reducer && reducer.fn ? reducer.fn(state, action): state
}

export default app