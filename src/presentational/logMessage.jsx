import * as React from "react"

export default class LogMessage extends React.Component {
    render() { 
        const message = (className, info) => (
            <li key={this.props.messages.indexOf(this.props.message)}
                className={className}>
                <span className="message-label">{info}</span>
                {this.props.message.body}
            </li>)

        return this.props.isDescription
            ? message("description", "New issue: ")
            : message("log", "info: ")
    }
}