import * as React from "react"
import ColorSelection from "../services/colorSelection"

export default class UserMessage extends React.Component {
    render() { 
        return <li className="message" key={this.props.messages.indexOf(this.props.message)}>
            <span className="username"
                  style={{color: new ColorSelection().getUsernameColor(this.props.message.username)}}>
                  {this.props.message.username}
            </span>
            <span className="messageBody">{this.props.message.body}</span>
        </li>
    }
}

