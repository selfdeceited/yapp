import * as React from "react"

export default class PlayerActions extends React.Component {
    render() { 
        return (
        <div className={this.props.moderatorExists && this.props.description ? 'visible' : 'invisible'}>
            <input className="inputMessage" placeholder="Enter estimation" tabIndex="1"
                autoFocus={true}
                onKeyDown={_ => this.props.startTyping(_, this.props.username)}
            />
        </div>)
    }
}



