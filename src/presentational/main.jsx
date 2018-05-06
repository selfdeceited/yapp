import * as React from "react"
import LoginContainer from "../containers/login"
import MessagesContainer from "../containers/messages"
import SocketRegistrationContainer from "../containers/socketRegistration"

export default class Main extends React.Component {
    render() { 
        return <div>
            <ul className="pages">
            {
                this.props.showLogin ? <LoginContainer/> : <MessagesContainer/>
            }
            </ul>
            <SocketRegistrationContainer/>
         </div>
    }
}