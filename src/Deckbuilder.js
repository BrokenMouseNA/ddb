import React, { Component } from 'react';
import BuilderBar from './BuilderBar.js';
import CharacterPicker from './CharacterPicker.js';

class Deckbuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pointTotal: 30,
            cardCountTotal: 30,
            currentAffiliation: null,
            currentFactions: [],
            affiliationRestricted: true,
            factionRestricted: true,
            cards: {
                characters: [],
                upgrades: [],
                supports: [],
                battlefields: []
            },
            selectedCharacters: [],
            selectedDeckCards: [],
            selectedBattlefield: []
        }
        this.addSelectedCharacter = this.addSelectedCharacter.bind(this);
        this.removeSelectedCharacter = this.removeSelectedCharacter.bind(this);
        this.setEliteStatus = this.setEliteStatus.bind(this);
    }

    componentDidMount() {
        fetch("https://swdestinydb.com/api/public/cards/")
        .then((response) => response.json())
        .then((cards) => {
            this.processCards(cards);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    filterCards(cards, cardType) {
        return cards.filter(card => {
            return card.type_code === cardType;
        })
    }

    filterCharacters(cards) {
        let characters = this.filterCards(cards, "character");
        return characters.map(card => {
            return this.assignPoints(card);
        })
    }

    assignPoints(character) {
        let nonEliteCost = parseInt(character.points.split("/")[0], 10);
        let eliteCost = parseInt(character.points.split("/")[1], 10);
        character.nonEliteCost = nonEliteCost;
        if(eliteCost) { character.eliteCost = eliteCost; }
        character.elite = false;
        return character;
    }

    processCards(importedCards) {
        let cards = {
            characters: this.filterCharacters(importedCards),
            upgrades: this.filterCards(importedCards, "upgrade"),
            supports: this.filterCards(importedCards, "support"),
            events: this.filterCards(importedCards, "event"),
            battlefields: this.filterCards(importedCards, "battlefield")
        };
        this.setState({cards});
    }

    determineAffiliation(selectedCharacters) {
        if(selectedCharacters.length > 0) {
            let currentAffiliation = selectedCharacters[0].affiliation_code;
            this.setState({currentAffiliation});
        } else {
            this.setState({currentAffiliation: null});
        }
    }

    addSelectedCharacter(character) {
        let characterCopy = Object.assign({}, character);
        let selectedCharacters = this.state.selectedCharacters.map(char => {
            return Object.assign({}, char);
        });
        selectedCharacters.push(characterCopy);
        this.setState({selectedCharacters});
        if (this.state.affiliationRestricted) { this.determineAffiliation(selectedCharacters); }
    }

    removeSelectedCharacter(characterCode) {
        let selectedCharacters = this.state.selectedCharacters.filter(char => {
            return char.code !== characterCode;
        })
        this.setState({selectedCharacters});
        if (this.state.affiliationRestricted) { this.determineAffiliation(selectedCharacters); }
    }

    setEliteStatus(characterCode, eliteStatus) {
        let selectedCharacters = this.state.selectedCharacters.map(char => {
            let updatedChar = Object.assign({}, char);
            if(updatedChar.code === characterCode) {
                updatedChar.elite = eliteStatus;
            }
            return updatedChar;
        });
        this.setState({selectedCharacters});
    }

    render() {
        return(
            <div className="deck-builder">
                <div className="deck-builder-content padded-div">
                    <CharacterPicker 
                        characters={this.state.cards.characters}
                        addSelectedCharacter={this.addSelectedCharacter}
                        selectedCharacters={this.state.selectedCharacters}
                        pointTotal={this.state.pointTotal}
                        currentAffiliation={this.state.currentAffiliation} />
                </div>
                <BuilderBar
                    selectedCharacters={this.state.selectedCharacters}
                    setEliteStatus={this.setEliteStatus}
                    removeSelectedCharacter={this.removeSelectedCharacter} />
            </div>
        )
    }
};

export default Deckbuilder;