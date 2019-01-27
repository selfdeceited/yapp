import * as React from "react"
import LoginContainer from "../containers/login"
import VotingContainer from "../containers/voting"

export default class Main extends React.Component {
    render() { 
        return (
        <div>
            <div className="pages">
                { this.props.showLogin ? <LoginContainer/> : <VotingContainer/> }
            </div>
         </div>
         )
    }
}