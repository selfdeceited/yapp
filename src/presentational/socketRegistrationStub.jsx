import * as React from "react"

export default class SocketRegistrationStub extends React.Component {
    render() { return <div onLoad={this.props.start(this.props.getUsername)}></div>}
}