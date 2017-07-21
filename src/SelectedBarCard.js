import React, { Component } from 'react';
import DefaultArtSrc from './images/artworkUnavailable.jpg';

class SelectedBarCard extends Component {
    constructor(props) {
        super(props);
        this.removeSelectedCard = this.removeSelectedCard.bind(this);
        this.addSelectedCard = this.addSelectedCard.bind(this);
        // this.showFullArt = this.showFullArt.bind(this);
        // this.followMouse = this.followMouse.bind(this);
        // this.unfollowMouse = this.unfollowMouse.bind(this);
        this.state = {
            fullArtDisplay: 'none',
            x: null,
            y: null
        }
    }

    removeSelectedCard() {
        this.props.removeSelectedCard(this.props.card);
    }

    addSelectedCard() {
        if(this.props.card.countInDeck === 1) {
            this.props.addSelectedCard(this.props.card);
        }
    }

    // followMouse() {
    //     document.addEventListener('mousemove', this.showFullArt);
    // }

    // unfollowMouse() {
    //     this.setState({
    //         fullArtDisplay: 'none',
    //         x: null,
    //         y: null
    //     })
    //     document.removeEventListener('mousemove', this.showFullArt);
    // }

    // showFullArt(e) {
    //     this.setState({
    //         fullArtDisplay: 'inline',
    //         x: e.pageX,
    //         y: e.pageY - 175
    //     });
    // }

    renderAddButton() {
        if(this.props.card.countInDeck === 2) {
            return(
                <div className="selected-card-button" onClick={this.addSelectedCard}>
                    <span>x2</span>
                </div>
            );
        } else {
            return(
                <div className="add-button selected-card-button" onClick={this.addSelectedCard}>
                    <span>+</span>
                </div>
            );
        }
    }

    render() {
        return(
            <div className="selected-bar-card" >
                <div className="selected-card-image-container">
                    <img src={this.props.card.imagesrc || DefaultArtSrc} alt=""/>
                </div>
                <div className={"selected-card-faction-container " + this.props.card.faction_code}></div>
                <div className="selected-card-name-container">
                    {this.props.card.name}
                </div>
                {this.renderAddButton()}
                <div className="removal-button selected-card-button" onClick={this.removeSelectedCard}>
                    <span>-</span>
                </div>
                <div 
                    className="item-full-art"
                    style={{display: this.state.fullArtDisplay, top: this.state.y, left: this.state.x}}>
                    <img src={this.props.card.imagesrc || DefaultArtSrc} alt="full card art"/>
                </div>
            </div>
        );   
    }
};

export default SelectedBarCard;