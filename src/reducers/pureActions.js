import * as R from 'ramda'

export const add = stateChanges => (state, action) => R.merge(state, stateChanges)
export const noChanges = (state, action) => state
export const addWithCheck = (predicate, getStateChanges) => 
  predicate ? add(getStateChanges()) : noChanges

export const addWithAction = (stateChanges, fn) => (state, action) => {
  fn()
  return R.merge(state, stateChanges)
}

export const addWithCheckAndAction = (predicate, getStateChanges, fn) => 
  predicate ? addWithAction(getStateChanges(), fn) : noChanges

// TODO: refactor