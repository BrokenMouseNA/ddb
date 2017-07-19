import React, { Component } from 'react';
import SelectableList from './SelectableList.js';

class SupportPicker extends Component {
    constructor(props) {
        super(props);
        this.toggleList = this.toggleList.bind(this);
        this.state = {
            showList: false
        }
    }

    supportsByAffiliationAndFaction() {
        return this.props.supports.filter(support => {
            let factionMatch = true;
            let affiliationMatch = true;
            if(this.props.currentFactions.length > 0 && support.faction_code !== "gray") {
                factionMatch = this.props.currentFactions.indexOf(support.faction_code) !== -1
            }
            if(this.props.currentAffiliation && support.affiliation_code !== "neutral") {
                affiliationMatch = this.props.currentAffiliation === support.affiliation_code
            }
            return factionMatch && affiliationMatch;
        });
    }

    availableSupports() {
        let filteredSupports = this.supportsByAffiliationAndFaction();
        let selectedSupportCodes = this.props.selectedSupports.map(support => {
            return support.code;
        });
        return filteredSupports.filter(support => {
            return selectedSupportCodes.indexOf(support.code) === -1;
        });
    }

    toggleList() {
        this.setState({showList: !this.state.showList})
    }

    listClasses() {
        let baseClasses = ["support-picker-list-container", "picker-list-container"];
        if(!this.state.showList) {
            baseClasses.push("hidden-list")
        }
        return baseClasses.join(" ");
    }

    render() {
        return(
            <div className="support-picker">
                <h2 onClick={this.toggleList}>Supports</h2>
                <div className={this.listClasses()}>
                    <SelectableList 
                        items={this.availableSupports()}
                        updateSelected={this.props.addSelectedSupport}
                        textFilter={""} />
                </div>
            </div>
        );
    }
};

export default SupportPicker;