import * as React from "react"
import LogMessage from "./logMessage"
import UserMessage from "./userMessage"

export default class Messages extends React.Component {
    componentDidUpdate() {
        if (this.messagesEnd)
            this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    render() { 
        return (
            <li className="chat page">
              <div className="chatArea">
                <ul className="messages">
                  { 
                      this.props.messages.map(m => m.isLog
                      ? <LogMessage key={this.props.messages.indexOf(m)} messages={this.props.messages} message={m}/>
                      : <UserMessage key={this.props.messages.indexOf(m)} messages={this.props.messages} message={m}/>)
                  }
                  <li ref={el => { this.messagesEnd = el; }}></li>
                </ul>
              </div>
              <input className="inputMessage" placeholder="Type here..." tabIndex="1"
                autoFocus={true}
                onKeyDown={_ => this.props.startTyping(_, this.props.username)}
              />
            </li>
          )
    }
}