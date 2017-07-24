import React, { Component } from 'react';
import BuilderBarCharacters from './BuilderBarCharacters.js';
import BuilderBarUpgrades from './BuilderBarUpgrades.js';
import BuilderBarEvents from './BuilderBarEvents.js';
import BuilderBarSupports from './BuilderBarSupports.js';

class BuilderBar extends Component {

    barClasses() {
        let classes = ["builder-bar"];
        if(this.props.show) {
            classes.push("show-bar");
        }
        return classes.join(" ");
    }

    render() {
        return(
            <div className={this.barClasses()}>
                <div className="builder-bar-header padded-div">
                    Destiny Deck Builder
                </div>
                <div className="builder-bar-sections">
                    <BuilderBarCharacters
                        selectedCharacters={this.props.selectedCharacters}
                        setEliteStatus={this.props.setEliteStatus}
                        removeSelectedCharacter={this.props.removeSelectedCharacter} />
                    <BuilderBarUpgrades 
                        selectedUpgrades={this.props.selectedUpgrades}
                        addSelectedUpgrade={this.props.addSelectedUpgrade}
                        removeSelectedUpgrade={this.props.removeSelectedUpgrade} />
                    <BuilderBarEvents
                        selectedEvents={this.props.selectedEvents}
                        addSelectedEvent={this.props.addSelectedEvent}
                        removeSelectedEvent={this.props.removeSelectedEvent} />
                    <BuilderBarSupports
                        selectedSupports={this.props.selectedSupports}
                        addSelectedSupport={this.props.addSelectedSupport}
                        removeSelectedSupport={this.props.removeSelectedSupport} />
                </div>
            </div>
        )
    }
};

export default BuilderBar;