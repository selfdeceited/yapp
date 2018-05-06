import { connect } from 'react-redux'
import { SocketRegistration } from "../services/socketRegistration"
import { addChatMessage, connected } from '../actions/index'
import SocketRegistrationStub from '../presentational/socketRegistrationStub'
import * as React from "react"

const mapStateToProps = (state) => {
    return {
      getUsername: () => state.username
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      start: (getUsername) => {
          var add = message => dispatch(addChatMessage(message));
          var connect = () => dispatch(connected());
          //new SocketRegistration(getUsername, dispatch(addChatMessage), dispatch(connected))
          new SocketRegistration(getUsername, add, connect)
        }
    }
  }

 const SocketRegistrationContainer = connect(mapStateToProps, mapDispatchToProps)(SocketRegistrationStub)

 export default SocketRegistrationContainer