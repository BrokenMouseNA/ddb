import React, { Component } from 'react';
import SelectedBarCard from './SelectedBarCard.js';

class BuilderBarSupports extends Component {

    showSupports() {
        return this.props.selectedSupports.length > 0;
    }

    supportCount() {
        return this.props.selectedSupports.reduce((sum, support) => {
            return sum + support.countInDeck;
        }, 0)
    }

    renderSelectedSupports() {
        if(this.showSupports()) {
            return (
                <div 
                    className="bbc-support-list"
                    style={{display: (this.showSupports() ? "block" : "none")}}>
                    {this.props.selectedSupports.map((card, index) => {
                        return(
                            <SelectedBarCard
                                key={index}
                                selectedIndex={index}
                                card={card}
                                addSelectedCard={this.props.addSelectedSupport}
                                removeSelectedCard={this.props.removeSelectedSupport}
                                desktop={this.props.desktop} />
                        )
                    })}
                </div>
            )
        }
    }

    render() {
        return(
            <div className="builder-bar-supports builder-bar-section">
                <div className="builder-bar-section-title padded-div">
                    <span>Supports - {this.supportCount()}</span>
                </div>
                <div 
                    className="bb-empty-state padded-div"
                    style={{display: (this.showSupports() ? "none" : "block")}}>
                    <span>No Supports Selected</span>
                </div>
                {this.renderSelectedSupports()}
            </div>
        )
    }
};

export default BuilderBarSupports;