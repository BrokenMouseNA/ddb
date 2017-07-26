import React, { Component } from 'react';
import BuilderBar from './BuilderBar.js';
import CharacterPicker from './CharacterPicker.js';
import UpgradePicker from './UpgradePicker.js';
import EventPicker from './EventPicker.js';
import SupportPicker from './SupportPicker.js';

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
            showBuilderBar: false,
            cards: {
                characters: [],
                events: [],
                upgrades: [],
                supports: [],
                battlefields: []
            },
            selectedCharacters: [],
            selectedUpgrades: [],
            selectedEvents:[],
            selectedSupports: [],
            selectedBattlefield: []
        }
        this.addSelectedCharacter = this.addSelectedCharacter.bind(this);
        this.removeSelectedCharacter = this.removeSelectedCharacter.bind(this);
        this.setEliteStatus = this.setEliteStatus.bind(this);
        this.addSelectedUpgrade = this.addSelectedUpgrade.bind(this);
        this.removeSelectedUpgrade = this.removeSelectedUpgrade.bind(this);
        this.addSelectedEvent = this.addSelectedEvent.bind(this);
        this.removeSelectedEvent = this.removeSelectedEvent.bind(this);
        this.addSelectedSupport = this.addSelectedSupport.bind(this);
        this.removeSelectedSupport = this.removeSelectedSupport.bind(this);
        this.toggleBuilderBar = this.toggleBuilderBar.bind(this);
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

    determineFactions(selectedCharacters) {
        if(selectedCharacters.length > 0) {
            let currentFactions = selectedCharacters.reduce((factions, char) => {
                if(factions.indexOf(char.faction_code) === -1) { factions.push(char.faction_code); }
                return factions;
            }, []);
            this.setState({currentFactions});
        } else {
            this.setState({currentFactions: []})
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
        if (this.state.factionRestricted) { this.determineFactions(selectedCharacters); }
    }

    removeSelectedCharacter(characterIndex) {
        let selectedCharacters = this.state.selectedCharacters.map(char => {
            return Object.assign({}, char);
        });
        selectedCharacters.splice(characterIndex, 1);
        this.setState({selectedCharacters});
        if (this.state.affiliationRestricted) { this.determineAffiliation(selectedCharacters); }
        if (this.state.factionRestricted) { this.determineFactions(selectedCharacters); }
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

    addSelectedCard(addedCard, cardType) {
        let selectedCardTypes = this.state[cardType].map(event => {
            return Object.assign({}, event);
        });
        let matchingCard = selectedCardTypes.find(card => {
            return card.code === addedCard.code;
        });
        let updateObject = {};
        if(matchingCard && matchingCard.countInDeck !== 2) {
            matchingCard.countInDeck = 2;
            updateObject[cardType] = selectedCardTypes
            this.setState(updateObject);
        } else if(!matchingCard) {
            let cardClone = Object.assign({}, addedCard);
            cardClone.countInDeck = 1;
            selectedCardTypes.push(cardClone);
            updateObject[cardType] = selectedCardTypes
            this.setState(updateObject);
        }
    }

    removeSelectedCard(removedCard, cardType) {
        let selectedCardTypes = this.state[cardType].map(card => {
            return Object.assign({}, card);
        });
        let matchingCard = selectedCardTypes.find(card => {
            return card.code === removedCard.code;
        });
        if(matchingCard && matchingCard.countInDeck === 2) {
            matchingCard.countInDeck = 1;
        } else if(matchingCard) {
            selectedCardTypes = selectedCardTypes.filter(card => {
                return card.code !== matchingCard.code;
            });
        }
        let updateObject = {}
        updateObject[cardType] = selectedCardTypes;
        this.setState(updateObject);
    }

    addSelectedUpgrade(addedUpgrade) {
        this.addSelectedCard(addedUpgrade, "selectedUpgrades")
    }

    removeSelectedUpgrade(removedUpgrade) {
        this.removeSelectedCard(removedUpgrade, "selectedUpgrades");
    }

    addSelectedEvent(addedEvent) {
        this.addSelectedCard(addedEvent, "selectedEvents");
    }

    removeSelectedEvent(removedEvent) {
        this.removeSelectedCard(removedEvent, "selectedEvents");
    }

    addSelectedSupport(addedSupport) {
        this.addSelectedCard(addedSupport, "selectedSupports");
    }

    removeSelectedSupport(removedSupport) {
        this.removeSelectedCard(removedSupport, "selectedSupports");
    }

    toggleBuilderBar() {
        this.setState({showBuilderBar: !this.state.showBuilderBar});
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
                        currentAffiliation={this.state.currentAffiliation}
                        desktop={this.props.desktop} />
                    <UpgradePicker
                        upgrades={this.state.cards.upgrades}
                        addSelectedUpgrade={this.addSelectedUpgrade}
                        selectedUpgrades={this.state.selectedUpgrades}
                        currentAffiliation={this.state.currentAffiliation}
                        currentFactions={this.state.currentFactions}
                        desktop={this.props.desktop} />
                    <EventPicker
                        events={this.state.cards.events}
                        addSelectedEvent={this.addSelectedEvent}
                        selectedEvents={this.state.selectedEvents}
                        currentAffiliation={this.state.currentAffiliation}
                        currentFactions={this.state.currentFactions}
                        desktop={this.props.desktop} />
                    <SupportPicker
                        supports={this.state.cards.supports}
                        addSelectedSupport={this.addSelectedSupport}
                        selectedSupports={this.state.selectedSupports}
                        currentAffiliation={this.state.currentAffiliation}
                        currentFactions={this.state.currentFactions}
                        desktop={this.props.desktop} />
                </div>
                <BuilderBar
                    selectedCharacters={this.state.selectedCharacters}
                    setEliteStatus={this.setEliteStatus}
                    removeSelectedCharacter={this.removeSelectedCharacter}
                    selectedUpgrades={this.state.selectedUpgrades}
                    addSelectedUpgrade={this.addSelectedUpgrade}
                    removeSelectedUpgrade={this.removeSelectedUpgrade}
                    selectedEvents={this.state.selectedEvents}
                    addSelectedEvent={this.addSelectedEvent}
                    removeSelectedEvent={this.removeSelectedEvent}
                    selectedSupports={this.state.selectedSupports}
                    addSelectedSupport={this.addSelectedSupport}
                    removeSelectedSupport={this.removeSelectedSupport}
                    show={this.state.showBuilderBar}
                    desktop={this.props.desktop} />
                <div className="show-deck-button" onClick={this.toggleBuilderBar}>
                    <i className="material-icons">swap_horiz</i>
                </div>
            </div>
        )
    }
};

export default Deckbuilder;