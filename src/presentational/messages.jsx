import * as React from "react"
import LogMessage from "./logMessage"
import UserMessage from "./userMessage"
import ModeratorActionsContainer from "../containers/moderatorActions"

export default class Messages extends React.Component {
    componentDidUpdate() {
        if (this.messagesEnd)
            this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    render() { 
        return (
            <li className="chat">
              <div className="chatArea">
                <ul className="messages">
                  { 
                      this.props.messages.map(m => m.isLog
                      ? <LogMessage
                            key={this.props.messages.indexOf(m)}
                            messages={this.props.messages}
                            message={m}
                            isDescription={m.isDescription}
                        />
                      : <UserMessage key={this.props.messages.indexOf(m)} messages={this.props.messages} message={m}/>)
                  }
                  <li ref={el => { this.messagesEnd = el; }}></li>
                </ul>
              </div>
              <div>
              
              <button onClick={_ => this.props.claimModerator(this.props.username)}
                      className={'btn default-btn ' + (this.props.moderatorExists ? 'invisible' : 'visible')}>
                  <span>I'm moderator, let's start!</span></button>

              <div className={this.props.moderatorExists && this.props.description ? 'visible' : 'invisible'}>
                        <input className="inputMessage" placeholder="Enter estimation" tabIndex="1"
                            autoFocus={true}
                            onKeyDown={_ => this.props.startTyping(_, this.props.username)}
                        />
                </div>
                <ModeratorActionsContainer/>
              </div>
            </li>
          )
    }
}

// todo: extract estimation part to other component