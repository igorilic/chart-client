import React, { Component } from 'react';
import LineComponent from './components/Line';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-container">
          <header className="App-header">Discovergy Demo Client</header>
          <div className="App-chart">
            <LineComponent />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
