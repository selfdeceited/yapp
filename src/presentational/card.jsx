import * as React from 'react'

export default class Card extends React.Component {
    render() {
        return (
        <span>
            <input type="checkbox" checked={this.props.card.isChecked}
                onChange={e => this.props.onEstimate(e)}/>
            <u>{this.props.card.estimation}
                <b>{this.props.card.title}</b>
                {this.props.card.description}
            </u>
            <b></b>
        </span>)
    }
}