import { connect } from 'react-redux'
import SocketRegistrationSingleton from "../services/socketRegistrationSingleton"
import { addChatMessage, connected } from '../actions/index'
import SocketRegistrationStub from '../presentational/socketRegistrationStub'
import * as React from "react"

const mapStateToProps = state => {
    return {
      getUsername: () => state.username
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        start: getUsername => {
            var add = message => dispatch(addChatMessage(message));
            var connect = () => dispatch(connected());
             
            SocketRegistrationSingleton.instance.addChatMessage = add;
            SocketRegistrationSingleton.instance.getUsername = getUsername;
            SocketRegistrationSingleton.instance.connected = connect;
            SocketRegistrationSingleton.instance.register()
        }
    }
  }

 const SocketRegistrationContainer = connect(mapStateToProps, mapDispatchToProps)(SocketRegistrationStub)

 export default SocketRegistrationContainer