import * as R from 'ramda'

export const initialState = {
  username: "",
  logged_in: false,
  messages: [],
  typing: false, 
  connected: true,
  lastTypingTime: null,
}

const app = (state, action) => {
  if (state === undefined)
    state = initialState

  const add = stateChanges => (state, action) => R.merge(state, stateChanges)
  const addWithCheck = (predicate, stateChanges) => predicate ? add(stateChanges) : (state, action) => state

  const basicReducers = {
    'SET_USERNAME': add({ username: action.username, logged_in: true }),
    'CONNECTED': add({ connected: true }),
    'ADD_MESSAGE': addWithCheck(action.message && state.connected, 
      { messages: state.messages.concat([action.message])})
  }

  const reducer = basicReducers[action.type]
  if (!!reducer) {
    return reducer(state, action)
  } else return state
}

export default app