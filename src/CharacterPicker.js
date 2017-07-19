import React, { Component } from 'react';
import SelectableList from './SelectableList.js';

class CharacterPicker extends Component {

    constructor(props) {
        super(props);
        this._addSelectedCharacter = this._addSelectedCharacter.bind(this);
        this.toggleList = this.toggleList.bind(this);
        this.state = {
            showList: true
        };
    }

    _addSelectedCharacter(character) {
        this.props.addSelectedCharacter(character);
    }

    currentPointTotal() {
        return this.props.selectedCharacters.reduce((sum, character) => {
            let characterCost = character.elite ? character.eliteCost : character.nonEliteCost;
            return sum + characterCost;
        }, 0)
    }

    availablePoints() {
        return this.props.pointTotal - this.currentPointTotal();
    }

    availableCharacters() {
        let availablePoints = this.availablePoints();
        let excludedCharacterCodes = this.props.selectedCharacters.filter(char => {
            return char.is_unique;
        }).map(char => { return char.code; });
        return this.props.characters.filter(char => {
            let matchesAffiliation = this.props.currentAffiliation ? char.affiliation_code === this.props.currentAffiliation : true;
            return !excludedCharacterCodes.includes(char.code) && char.nonEliteCost <= availablePoints && matchesAffiliation;
        });
    }

    maximumValue(character, availablePoints) {
        return (character.eliteCost && character.eliteCost <= availablePoints) ? character.eliteCost : character.nonEliteCost;
    }

    sortedAvailableCharacters() {
        let availablePoints = this.availablePoints();
        return this.availableCharacters().sort((charA, charB) => {
            return this.maximumValue(charB, availablePoints) - this.maximumValue(charA, availablePoints)
        });
    }

    toggleList() {
        this.setState({showList: !this.state.showList})
    }

    listClasses() {
        let baseClasses = ["character-picker-list-container", "picker-list-container"];
        if(!this.state.showList || this.availableCharacters().length === 0) {
            baseClasses.push("hidden-list")
        }
        return baseClasses.join(" ");
    }

    render() {
        return(
            <div className="character-picker">
                <h2 onClick={this.toggleList}>Characters</h2>
                <div className={this.listClasses()}>
                    <SelectableList 
                        items={this.sortedAvailableCharacters()}
                        updateSelected={this._addSelectedCharacter}
                        textFilter={""}
                        availablePoints={this.availablePoints()} />
                </div>
            </div>
        )
    }
};

export default CharacterPicker;