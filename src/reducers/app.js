import * as R from 'ramda'

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

  const add = stateChanges => (state, action) => R.merge(state, stateChanges)
  const addWithCheck = (predicate, stateChanges) => predicate ? add(stateChanges()) : (state, action) => state
  const addWithAction = (stateChanges, action) => {
    var result = add(stateChanges)
    action(stateChanges)
    return result;
  }

  //todo: get rid of hardcoded action names and export them gracefully from actions!
  const basicReducers = {
    'SET_USERNAME': addWithAction({ username: action.username, logged_in: true }, sc => {
      if(!sc || !sc.username) return;
      document.title = `YAPP - ${sc.username}`
    }),
    'CONNECTED': add({ connected: true }),
    'ADD_MESSAGE': addWithCheck(action.message && state.connected, () => (
      { messages: state.messages.concat([action.message]), 
        description: action.message.isDescription ? action.message.body : state.description
      })),
    'ADD_MODERATOR': addWithCheck(action.username && state.connected, () => ({isModerator: true})),
    'MODERATOR_SET': add({moderatorExists: true}),
    'FINISH_ESTIMATION': addWithCheck(action.estimationResult && state.connected, () => ({
      description: undefined,
      messages: state.messages.concat(action.estimationResult.map(
        x =>({username: x.username, body: x.message, isLog: false, isDescription: false})))
    }))
  }

  const reducer = basicReducers[action.type]
  return reducer ? reducer(state, action): state;
}

export default app