import * as React from "react"
import style from './../style.css'
import legacy from './garbage'

export class App extends React.Component {
    componentWillMount(){
      legacy.garbage()
    }
    render() {
        return (
            <ul className="pages">
            <li className="chat page">
              <div className="chatArea">
                <ul className="messages"></ul>
              </div>
              <input className="inputMessage" placeholder="Type here..."/>
            </li>
            <li className="login page">
              <div className="form">
                <h3 className="title">What's your nickname?</h3>
                <input className="usernameInput" type="text" maxLength="14" />
              </div>
            </li>
          </ul>
        );
    }
}