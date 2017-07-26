import React, { Component } from 'react';
import DefaultArtSrc from './images/artworkUnavailable.jpg';

class SelectedBarCharacter extends Component {
    constructor(props) {
        super(props);
        this.promoteCharacter = this.promoteCharacter.bind(this);
        this.demoteCharacter = this.demoteCharacter.bind(this);
        this.removeSelectedCharacter = this.removeSelectedCharacter.bind(this);
        this.followMouse = this.followMouse.bind(this);
        this.unfollowMouse = this.unfollowMouse.bind(this);
        this.showFullArt = this.showFullArt.bind(this);
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
        this.props.removeSelectedCharacter(this.props.selectedIndex);
    }

    followMouse() {
        document.addEventListener('mousemove', this.showFullArt);
    }

    unfollowMouse() {
        this.setState({
            fullArtDisplay: 'none',
            x: null,
            y: null
        })
        document.removeEventListener('mousemove', this.showFullArt);
    }

    showFullArt(e) {
        this.setState({
            fullArtDisplay: 'inline',
            x: e.pageX - 270,
            y: e.pageY - 150
        });
    }

    render() {
        let inputProps = {};
        if(this.props.desktop) {
            inputProps.onMouseEnter = this.followMouse;
            inputProps.onMouseLeave = this.unfollowMouse;
        }
        return(
            <div className="selected-bar-character"
                {...inputProps}>
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
                <div 
                    className="item-full-art"
                    style={{display: this.state.fullArtDisplay, top: this.state.y, left: this.state.x}}>
                    <img src={this.props.character.imagesrc || DefaultArtSrc} alt="full card art"/>
                </div>
            </div>
        )
    }
};

export default SelectedBarCharacter;