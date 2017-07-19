import React, { Component } from 'react';
import SelectableList from './SelectableList.js';

class UpgradePicker extends Component {
    constructor(props) {
        super(props);
        this.toggleList = this.toggleList.bind(this);
        this.state = {
            showList: false
        }
    }

    upgradesByAffiliationAndFaction() {
        return this.props.upgrades.filter(upgrade => {
            let factionMatch = true;
            let affiliationMatch = true;
            if(this.props.currentFactions.length > 0 && upgrade.faction_code !== "gray") {
                factionMatch = this.props.currentFactions.indexOf(upgrade.faction_code) !== -1
            }
            if(this.props.currentAffiliation && upgrade.affiliation_code !== "neutral") {
                affiliationMatch = this.props.currentAffiliation === upgrade.affiliation_code
            }
            return factionMatch && affiliationMatch;
        });
    }

    availableUpgrades() {
        let filterdUpgrades = this.upgradesByAffiliationAndFaction();
        let selectedUpgradeCodes = this.props.selectedUpgrades.map(upgrade => {
            return upgrade.code;
        });
        return filterdUpgrades.filter(upgrade => {
            return selectedUpgradeCodes.indexOf(upgrade.code) === -1;
        });
    }

    toggleList() {
        this.setState({showList: !this.state.showList})
    }

    listClasses() {
        let baseClasses = ["upgrade-picker-list-container", "picker-list-container"];
        if(!this.state.showList) {
            baseClasses.push("hidden-list")
        }
        return baseClasses.join(" ");
    }

    render() {
        return(
            <div className="upgrade-picker">
                <h2 onClick={this.toggleList}>Upgrades</h2>
                <div className={this.listClasses()}>
                    <SelectableList 
                        items={this.availableUpgrades()}
                        updateSelected={this.props.addSelectedUpgrade}
                        textFilter={""} />
                </div>
            </div>
        );
    }
};

export default UpgradePicker;