import React, { Component } from 'react';
import SelectedBarCharacter from './SelectedBarCharacter.js'

class BuilderBarCharacters extends Component {

    showCharacters() {
        return this.props.selectedCharacters.length > 0;
    }

    currentPointTotal() {
        return this.props.selectedCharacters.reduce((sum, character) => {
            let characterCost = character.elite ? character.eliteCost : character.nonEliteCost;
            return sum + characterCost;
        }, 0)
    }

    renderSelectedCharacters() {
        if(this.showCharacters()) {
            return(
                <div 
                    className="bbc-character-list"
                    style={{display: (this.showCharacters() ? "block" : "none")}}>
                    {this.props.selectedCharacters.map((char, index) => {
                        return(
                            <SelectedBarCharacter
                                key={index}
                                selectedIndex={index}
                                character={char}
                                setEliteStatus={this.props.setEliteStatus}
                                removeSelectedCharacter={this.props.removeSelectedCharacter} />
                        )
                    })}
                </div>
            );
        }
    }

    render() {
        return(
            <div className="builder-bar-characters builder-bar-section">
                <div className="builder-bar-section-title padded-div">
                    <span>Characters - {this.currentPointTotal()}</span>
                </div>
                <div 
                    className="bbc-empty-state padded-div"
                    style={{display: (this.showCharacters() ? "none" : "block")}}>
                    <span>No Characters Selected</span>
                </div>
                {this.renderSelectedCharacters()}
            </div>
        )
    }
};

export default BuilderBarCharacters;