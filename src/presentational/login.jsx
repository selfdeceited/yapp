import * as React from "react"

export default class Login extends React.Component {
    render() { 
        return <li className="login page">
            <div className="form">
                <h3 className="title">What's your nickname?</h3>
                <input className="usernameInput" type="text" maxLength="14" tabIndex="0" 
                    autoFocus={true}
                    onKeyDown={_ => this.props.startTyping(_)}
                />
            </div>
        </li>
    }
}