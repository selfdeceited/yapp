export const typingDefault = (action, dispatch) => (e, username) => {
    if (e.key === "Enter") {
      action(e, username, dispatch)
    }
  }