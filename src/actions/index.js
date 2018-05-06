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