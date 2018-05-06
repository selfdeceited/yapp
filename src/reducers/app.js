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
    state = initialState;

  const concatObj = (prev, next) => Object.assign({}, prev, next);

  const addNew = (name, newStateChanges) => {
    var returnObj = {};
    returnObj[name] = (state, action) => concatObj(state, newStateChanges)
    return returnObj;
  }

  const basicReducers = [
    addNew('SET_USERNAME', { username: action.username, logged_in: true }),
    addNew('CONNECTED', { connected: true }),
    {
      'ADD_MESSAGE': (state, action) => action.message && state.connected
        ? concatObj(state, { messages: state.messages.concat([action.message])})
        : state
    }
  ].reduce(concatObj);

  const reducer = basicReducers[action.type];
  if (!!reducer) {
    return reducer(state, action)
  } else return state;
}

export default app