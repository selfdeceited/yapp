import * as R from 'ramda'
import { initialState } from "./initialState"
import { login } from "./login"
import { moderation } from "./moderation"
import { estimation } from "./estimation"

const reducers = [login, moderation, estimation]

const app = (state, action) => {
  if (state === undefined)
    state = initialState

  const contextedReducers = reducers.map(x => x(state, action))
  const reducer = R.reduce(R.concat, [], contextedReducers).filter(x => x.name == action.type)[0]

  if (!reducer || !reducer.fn)
    return state

  return reducer.fn(state, action)
}

export default app