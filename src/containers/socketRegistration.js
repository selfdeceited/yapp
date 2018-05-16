import { connect } from 'react-redux'
import SocketRegistrationSingleton from "../services/socketRegistrationSingleton"
import { addChatMessage, connected } from '../actions/index'
import SocketRegistrationStub from '../presentational/socketRegistrationStub'
import * as React from 'react'
import * as R from 'ramda'


const registration = SocketRegistrationSingleton.instance;

const mapStateToProps = state => {
    return {
      getUsername: () => state.username
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        start: getUsername => {
            registration.addChatMessage = message => dispatch(addChatMessage(message))
            registration.connected = () => dispatch(connected())
            registration.getUsername = getUsername
            registration.register()
        }
    }
  }

 const SocketRegistrationContainer = connect(mapStateToProps, mapDispatchToProps)(SocketRegistrationStub)

 export default SocketRegistrationContainer