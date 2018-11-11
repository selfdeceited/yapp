export const setUsername = username => ({ type: 'SET_USERNAME', username })
export const addChatMessage = message => ({ type: "ADD_MESSAGE", message })
export const connected = () => ({ type: "CONNECTED" })
export const addModerator = username => ({ type: "ADD_MODERATOR", username })
export const moderatorSet = () => ({ type: "MODERATOR_SET" })
export const finishEstimation = estimationResult => ({ type: "FINISH_ESTIMATION", estimationResult })

// todo: reuse action names const to match same in reducers to avoid the chance of wrong copy-paste.