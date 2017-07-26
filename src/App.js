import React, { Component } from 'react';
import './App.css';
import Deckbuilder from './Deckbuilder.js'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      desktop: false
    }
    this.updateSizeState = this.updateSizeState.bind(this);
  }

  componentDidMount() {
    this.updateSizeState();
    window.addEventListener('resize', this.updateSizeState);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSizeState);
  }

  updateSizeState() {
    if(window.innerWidth > 768) {
      this.setState({desktop: true});
    } else {
      this.setState({desktop: false});
    }
  }

  render() {
    return (
      <div className="App">
        <Deckbuilder desktop={this.state.desktop} />
      </div>
    );
  }
}

export default App;
