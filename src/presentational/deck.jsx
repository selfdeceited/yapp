import React from 'react'
import Card from './card'

export default class Deck extends React.Component {
    render() {
        // TODO: extract to separate place
        const cards = [
            {
                estimation: 0,
                title: 'EASY-PEASY',
                description: 'two clicks, that is',
                isChecked: true
            },{
                estimation: 0.5,
                title: 'OKAY',
                description: 'no worries mates',
                isChecked: true
            },{
                estimation: 0.8,
                title: 'OH LOOK',
                description: 'no big deal, right?',
                isChecked: true
            },{
                estimation: 1,
                title: 'NEED SOME COFFEE',
                description: 'let\'s see',
                isChecked: true
            },{
                estimation: 1.5,
                title: 'OH WE CAN AGREE',
                description: 'not so default',
                isChecked: true
            },{
                estimation: 2,
                title: 'FINALLY INTERESTING',
                description: 'oh boy',
                isChecked: true
            },{
                estimation: 3,
                title: 'OH MY GOODNESS',
                description: '... will do?',
                isChecked: true
            }
        ]

        return (
            <div className="table">
                <div className="deck">
                    {
                        cards.map(card => <Card
                                key={card.estimation}
                                card={card}
                                onEstimate={e => this.props.estimate(card.estimation, this.props.username)}
                            />)
                    }
                </div>
            </div>
            )
    }
}