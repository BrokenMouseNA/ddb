import React, { Component } from 'react';
import SelectableListItem from './SelectableListItem.js';

class SelectableList extends Component {

    filteredItems() {
        let filter = this.props.textFilter;
        if(filter) {
            return this.props.items.filter(card => {
                return (
                    this.compareStrings(card.name, filter) || 
                    this.compareStrings(card.text, filter) ||
                    this.compareStrings(card.subtitle, filter) ||
                    this.compareStrings(card.affiliation_code, filter) ||
                    this.compareStrings(card.faction_code, filter) ||
                    this.compareStrings(card.faction_name, filter)
                );
            });
        } else {
            return this.props.items;
        }
    }

    compareStrings(first, second) {
        if(first) {
            return first.toLowerCase().indexOf(second.toLowerCase()) !== -1;
        } else {
            return false;
        }
    }

    render() {
        return(
            <div className="selectable-list">
                { this.filteredItems().map(card => {
                    return(
                        <SelectableListItem 
                            key={card.code}
                            card={card}
                            updateSelected={this.props.updateSelected}
                            availablePoints={this.props.availablePoints} />
                    )
                })}
            </div>
        )
    }
};

export default SelectableList;