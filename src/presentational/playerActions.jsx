import * as React from "react"
import DeckContainer from '../containers/deck'

export default class PlayerActions extends React.Component {
    render() { 
        // TODO: avoid hide/show and do full rerender, come on
        return (
        <div className={this.props.moderatorExists && this.props.description ? 'visible' : 'invisible'}>
            <aside>
                {this.props.moderatorExists && this.props.description ? <DeckContainer/> : null}
                <div>
                   <span className="custom-scope-title">... or enter your custom score:</span>
                    <input className="inputMessage estimation-message" placeholder="Enter estimation" tabIndex="1"
                        autoFocus={true}
                        onKeyDown={_ => this.props.startTyping(_, this.props.username)}
                    />
                </div>
            </aside>
        </div>)
    }
}



