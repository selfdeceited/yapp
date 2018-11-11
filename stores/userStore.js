const ObjectStore = require("./objectStore")

class UserStore extends ObjectStore {
    constructor(){
      super([])
    }
  
    add(newUser) {
      if (newUser.username)
        this.data.push(newUser)
    }
    remove(username) {
      this.data = this.data.filter(x=>x.username !== username)
    }
  
    exists(username) {
      return this.data.filter(x => x.username === username).length > 0
    }
  
    getBy(username) {
      return this.data.filter(x => x.username === username)[0]
    }
    moderatorExists() {
      return this.data.filter(x => x.isModerator).length > 0
    }
}

module.exports = UserStore