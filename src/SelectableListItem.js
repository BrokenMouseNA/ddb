import React, { Component } from 'react';
import DefaultArtSrc from './images/artworkUnavailable.jpg';

class SelectableListItem extends Component {

    constructor(props) {
        super(props);
        this.followMouse = this.followMouse.bind(this);
        this.unfollowMouse = this.unfollowMouse.bind(this);
        this.showFullArt = this.showFullArt.bind(this);
        this._updateSelected = this._updateSelected.bind(this);
        this.logIt = this.logIt.bind(this);
        this.state = {
            fullArtDisplay: 'none',
            x: null,
            y: null
        }
    }

    _updateSelected() {
        this.unfollowMouse();
        this.props.updateSelected(this.props.card);
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
            x: e.pageX + 10,
            y: e.pageY - 175
        });
    }

    renderAvailableDice() {
        if(this.props.availablePoints && this.props.card.nonEliteCost) {
            if(this.props.card.eliteCost && this.props.card.eliteCost <= this.props.availablePoints) {
                return(
                    <div className="list-item-dice-container">
                        <div className="list-item-die">
                            <span>{this.props.card.nonEliteCost}</span>
                        </div>
                        <div className="list-item-die">
                            <span>{this.props.card.eliteCost}</span>
                        </div>
                    </div>
                )
            } else {
                return(
                    <div className="list-item-dice-container">
                        <div className="list-item-die">
                            <span>{this.props.card.nonEliteCost}</span>
                        </div>
                    </div>
                )
            }
        }
    }
    
    logIt() {
        console.log(this.props.card);
    }

    render() {
        return(
            <div 
                className="selectable-list-item"
                onClick={this._updateSelected}
                onMouseEnter={this.followMouse}
                onMouseLeave={this.unfollowMouse} >
                <div className="list-item-image-container">
                    <img src={this.props.card.imagesrc || DefaultArtSrc} alt=""/>
                </div>
                <div className={"faction-container " + this.props.card.faction_code}>
                    {this.renderAvailableDice()}
                </div>
                <div className="list-item-text-container">
                    <span className="list-item-title">{this.props.card.name}</span>
                    <span className="list-item-subtitle">{this.props.card.subtitle}</span>
                    <span className="list-item-text" dangerouslySetInnerHTML={{__html: this.props.card.text}}></span>
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

export default SelectableListItem;