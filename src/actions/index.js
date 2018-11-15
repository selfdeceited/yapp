export const actionTypes = {
    connected: "CONNECTED",
    addChatMessage: "ADD_MESSAGE",
    setUsername: "SET_USERNAME",
    addModerator: "ADD_MODERATOR",
    moderatorSet: "MODERATOR_SET",
    finishEstimation: "FINISH_ESTIMATION"
}

export const setUsername = username => ({ type: actionTypes.setUsername, username })
export const addChatMessage = message => ({ type: actionTypes.addChatMessage, message })
export const connected = () => ({ type: actionTypes.connected })
export const addModerator = username => ({ type: actionTypes.addModerator, username })
export const moderatorSet = () => ({ type: actionTypes.moderatorSet })
export const finishEstimation = estimationResult => ({ type: actionTypes.finishEstimation, estimationResult })
