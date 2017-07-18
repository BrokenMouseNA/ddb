import React, { Component } from 'react';
import BuilderBarCharacters from './BuilderBarCharacters.js';

class BuilderBar extends Component {
    render() {
        return(
            <div className="builder-bar">
                <div className="builder-bar-header padded-div">
                    Destiny Deck Builder
                </div>
                <div className="builder-bar-sections">
                    <BuilderBarCharacters
                        selectedCharacters={this.props.selectedCharacters}
                        setEliteStatus={this.props.setEliteStatus}
                        removeSelectedCharacter={this.props.removeSelectedCharacter} />
                </div>
            </div>
        )
    }
};

export default BuilderBar;