import * as React from "react"
import LoginContainer from "../containers/login"
import MessagesContainer from "../containers/messages"

export default class Main extends React.Component {
    render() { 
        return <div>
            <div className="pages">
            {
                this.props.showLogin ? <LoginContainer/> : <MessagesContainer/>
            }
            </div>
         </div>
    }
}