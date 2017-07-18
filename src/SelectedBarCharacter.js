import React, { Component } from 'react';
import DefaultArtSrc from './images/artworkUnavailable.jpg';

class SelectedBarCharacter extends Component {
    constructor(props) {
        super(props);
        this.promoteCharacter = this.promoteCharacter.bind(this);
        this.demoteCharacter = this.demoteCharacter.bind(this);
        this.removeSelectedCharacter = this.removeSelectedCharacter.bind(this);
        this.state = {
            fullArtDisplay: 'none',
            x: null,
            y: null
        }
    }

    promoteCharacter() {
        this.props.setEliteStatus(this.props.character.code, true);
    }

    demoteCharacter() {
        this.props.setEliteStatus(this.props.character.code, false);
    }

    renderDiceOptions() {
        if(this.props.character.eliteCost && this.props.character.elite) {
            return(
                <div className="character-die active-elite-die" onClick={this.demoteCharacter}>
                    <span>{this.props.character.eliteCost}</span>
                </div>
            );
        } else if (this.props.character.eliteCost && !this.props.character.elite) {
            return(
                <div className="character-die potential-elite-die" onClick={this.promoteCharacter}>
                    <span>+</span>
                </div>
            );
        }
    }

    removeSelectedCharacter() {
        this.props.removeSelectedCharacter(this.props.character.code);
    }

    render() {
        return(
            <div className="selected-bar-character">
                <div className="character-image-container">
                    <img src={this.props.character.imagesrc || DefaultArtSrc} alt=""/>
                </div>
                <div className={"faction-container " + this.props.character.faction_code}>
                    <div className="character-die non-elite-die">
                        <span>{this.props.character.nonEliteCost}</span>
                    </div>
                    {this.renderDiceOptions()}
                </div>
                <div className="character-name-container">
                    {this.props.character.name}
                </div>
                <div className="character-removal-button" onClick={this.removeSelectedCharacter}>
                    <span>-</span>
                </div>
            </div>
        )
    }
};

export default SelectedBarCharacter;