import * as React from "react"
import LogMessage from "./logMessage"
import UserMessage from "./userMessage"
import ModeratorActionsContainer from "../containers/moderatorActions"
import PlayerActionsContainer from "../containers/playerActions"

export default class Messages extends React.Component {
    componentDidUpdate() {
        if (this.messagesEnd)
            this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    render() { 
        return (
            <div className="chat">
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
                    <span>I'm moderator, let's start!</span>
                </button>
                <PlayerActionsContainer/>
                <ModeratorActionsContainer/>
              </div>
            </div>
          )
    }
}