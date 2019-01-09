import * as R from 'ramda'

export const add = stateChanges => (state, action) => R.merge(state, stateChanges)
export const noChanges = (state, action) => state
export const addWithCheck = (predicate, getStateChanges) => 
  predicate ? add(getStateChanges()) : noChanges