export const setUsername = username => {
  return {
    type: 'SET_USERNAME',
    username
  }
}

export const addChatMessage = message => {
  return {
    type: "ADD_MESSAGE",
    message
  }
}

export const connected = () => {
  return {
    type: "CONNECTED"
  }
}

export const addModerator = username => {
  return {
    type: "ADD_MODERATOR",
    username
  }
}

export const moderatorSet = () => {
  return {
    type: "MODERATOR_SET"
  }
}

export const finishEstimation = estimationResult => {
  return {
    type: "FINISH_ESTIMATION",
    estimationResult
  }
}