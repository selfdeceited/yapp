import io from 'socket.io-client'

let singleton = Symbol();
let singletonEnforcer = Symbol();

class SocketConnectionSingleton {

  constructor(enforcer) {
    if (enforcer !== singletonEnforcer)
       throw "Instantiation failed: use SocketConnectionSingleton.getInstance() instead of new.";
  }

  static get instance() {
    if (!this[singleton])
        this[singleton] = new SocketConnectionSingleton(singletonEnforcer);
    return this[singleton];
  }
  
  static set instance(v) { throw "Can't change constant property!" }
}

SocketConnectionSingleton.instance.socket = io()

export default SocketConnectionSingleton;