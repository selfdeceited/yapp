import io from 'socket.io-client'

let singleton = Symbol();
let singletonEnforcer = Symbol();

// TODO: singleton logic should go away (we expect socket to be opened once when redux is starting)
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