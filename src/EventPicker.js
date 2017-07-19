import React, { Component } from 'react';
import SelectableList from './SelectableList.js';

class EventPicker extends Component {
    constructor(props) {
        super(props);
        this.toggleList = this.toggleList.bind(this);
        this.state = {
            showList: false
        }
    }

    eventsByAffiliationAndFaction() {
        return this.props.events.filter(event => {
            let factionMatch = true;
            let affiliationMatch = true;
            if(this.props.currentFactions.length > 0 && event.faction_code !== "gray") {
                factionMatch = this.props.currentFactions.indexOf(event.faction_code) !== -1
            }
            if(this.props.currentAffiliation && event.affiliation_code !== "neutral") {
                affiliationMatch = this.props.currentAffiliation === event.affiliation_code
            }
            return factionMatch && affiliationMatch;
        });
    }

    availableEvents() {
        let filteredEvents = this.eventsByAffiliationAndFaction();
        let selectedEventCodes = this.props.selectedEvents.map(event => {
            return event.code;
        });
        return filteredEvents.filter(event => {
            return selectedEventCodes.indexOf(event.code) === -1;
        });
    }

    toggleList() {
        this.setState({showList: !this.state.showList})
    }

    listClasses() {
        let baseClasses = ["event-picker-list-container", "picker-list-container"];
        if(!this.state.showList) {
            baseClasses.push("hidden-list")
        }
        return baseClasses.join(" ");
    }

    render() {
        return(
            <div className="event-picker">
                <h2 onClick={this.toggleList}>Events</h2>
                <div className={this.listClasses()}>
                    <SelectableList 
                        items={this.availableEvents()}
                        updateSelected={this.props.addSelectedEvent}
                        textFilter={""} />
                </div>
            </div>
        );
    }
};

export default EventPicker;