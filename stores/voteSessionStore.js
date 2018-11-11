const ObjectStore = require("./objectStore")

class VoteSessionStore extends ObjectStore
{
  constructor() {
    super(undefined)
  }

  start(description) {
    this.data = []
    this.issueDescription = description
  }

  invalidate() {
    this.data = undefined
    this.issueDescription = undefined
  }

  containsVoteFor(username) {
    return this.data.filter(x=>x.username === username).length > 0
  }

  store(result) {
    this.data.push(result)
  }

  editResultFor(username, result)
  {
    this.data = this.data.filter(x => x.username !== username);
    this.store(result)
  }
}

module.exports = VoteSessionStore