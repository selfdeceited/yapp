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
                      className={this.props.moderatorExists ? 'invisible' : 'visible'}>
                  I'm moderator, let's start!</button>

              <div className={this.props.moderatorExists && this.props.description ? 'visible' : 'invisible'}>
                        <input className="inputMessage" placeholder="Enter estimation" tabIndex="1"
                            autoFocus={true}
                            onKeyDown={_ => this.props.startTyping(_, this.props.username)}
                        />
                </div>
                <div className={this.props.isModerator ? 'visible' : 'invisible'}>
                    <button onClick={_ => this.props.finishEstimation()}>Finish estimation</button>
                    <div className={this.props.description ? 'invisible' : 'visible'}>
                        <input className="inputMessage"
                            placeholder="Enter description" tabIndex="2"
                            onKeyDown={_ => this.props.startTypingDescription(_, this.props.username)}
                        />
                    </div>
                </div>
              </div>
            </li>
          )
    }
}

// todo: extract moderator part to other component