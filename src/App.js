import React, { Component } from 'react';
import './App.scss';
import Avatar from './components/Avatar';
import Button from './components/Button';

class App extends Component {

  renderTableTop = () => {
    const tableTopArray = [...Array(25).keys()];
    return <div className="tabletop">
      {tableTopArray.map(item => 
        <div className="tabletop__item" key={item}></div>
      )}
    </div>
  }

  renderControlPanel = () => {
    return <div className="control-panel">
      <div className="navigations">
        <Button label='Up' type='up' />
        <Button label='Down' type='down' />
        <Button label='Left' type='left' />
        <Button label='Right' type='right' />
      </div>
    </div>
  }

  render() {
    return (
      <div className="container">
        <h1>Robot Play</h1>
        <div className="tabletop-container">
          {this.renderTableTop()}
          <Avatar type='robot' />
        </div>
        {this.renderControlPanel()}
      </div>
    );
  }
}

export default App;
