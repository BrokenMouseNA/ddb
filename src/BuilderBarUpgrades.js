import React, { Component } from 'react';
import SelectedBarCard from './SelectedBarCard.js';

class BuilderBarUpgrades extends Component {

    showUpgrades() {
        return this.props.selectedUpgrades.length > 0;
    }

    upgradeCount() {
        return this.props.selectedUpgrades.reduce((sum, upgrade) => {
            return sum + upgrade.countInDeck;
        }, 0)
    }

    renderSelectedUpgrades() {
        if(this.showUpgrades()) {
            return (
                <div 
                    className="bbc-character-list"
                    style={{display: (this.showUpgrades() ? "block" : "none")}}>
                    {this.props.selectedUpgrades.map((card, index) => {
                        return(
                            <SelectedBarCard
                                key={index}
                                selectedIndex={index}
                                card={card}
                                addSelectedCard={this.props.addSelectedUpgrade}
                                removeSelectedCard={this.props.removeSelectedUpgrade} />
                        )
                    })}
                </div>
            )
        }
    }

    render() {
        return(
            <div className="builder-bar-upgrades builder-bar-section">
                <div className="builder-bar-section-title padded-div">
                    <span>Upgrades - {this.upgradeCount()}</span>
                </div>
                <div 
                    className="bb-empty-state padded-div"
                    style={{display: (this.showUpgrades() ? "none" : "block")}}>
                    <span>No Upgrades Selected</span>
                </div>
                {this.renderSelectedUpgrades()}
            </div>
        )
    }
};

export default BuilderBarUpgrades