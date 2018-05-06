import * as React from "react"

export default class LogMessage extends React.Component {
    render() { 
        return <li key={this.props.messages.indexOf(this.props.message)}
        className="log">{this.props.message.body}</li>
    }
}