class ObjectStore {
    constructor(data){
      this.data = data;
    }
    set(data) {
      this.data = data
    }
    get() {
      return this.data
    }
}

module.exports = ObjectStore;