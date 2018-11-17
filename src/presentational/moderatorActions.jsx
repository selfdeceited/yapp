import * as React from "react"

export default class ModeratorActions extends React.Component {
    render() { 
        return (
        <div className={this.props.isModerator ? 'visible' : 'invisible'}>
            { this.props.description ? (
                <button onClick={_ => this.props.finishEstimation()}>Finish estimation</button>
            ) : (
                <input className="inputMessage"
                    placeholder="Enter description" tabIndex="2"
                    onKeyDown={_ => this.props.startTypingDescription(_, this.props.username)}
                />
            ) }
        </div>)
    }
}