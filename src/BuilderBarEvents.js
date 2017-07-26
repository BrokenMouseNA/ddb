import React, { Component } from 'react';
import SelectedBarCard from './SelectedBarCard.js';

class BuilderBarEvents extends Component {

    showEvents() {
        return this.props.selectedEvents.length > 0;
    }

    eventCount() {
        return this.props.selectedEvents.reduce((sum, event) => {
            return sum + event.countInDeck;
        }, 0)
    }

    renderSelectedEvents() {
        if(this.showEvents()) {
            return (
                <div 
                    className="bbc-event-list"
                    style={{display: (this.showEvents() ? "block" : "none")}}>
                    {this.props.selectedEvents.map((card, index) => {
                        return(
                            <SelectedBarCard
                                key={index}
                                selectedIndex={index}
                                card={card}
                                addSelectedCard={this.props.addSelectedEvent}
                                removeSelectedCard={this.props.removeSelectedEvent}
                                desktop={this.props.desktop} />
                        )
                    })}
                </div>
            )
        }
    }

    render() {
        return(
            <div className="builder-bar-events builder-bar-section">
                <div className="builder-bar-section-title padded-div">
                    <span>Events - {this.eventCount()}</span>
                </div>
                <div 
                    className="bb-empty-state padded-div"
                    style={{display: (this.showEvents() ? "none" : "block")}}>
                    <span>No Events Selected</span>
                </div>
                {this.renderSelectedEvents()}
            </div>
        )
    }
};

export default BuilderBarEvents;