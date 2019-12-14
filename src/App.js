import React, { Component } from 'react';
import './App.scss';
import Avatar from './components/Avatar';
import Button from './components/Button';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentPositionX: 0,
      currentPositionY: 0,
      moving: false,
      movingDistance: 0
    };

    this.robotRef = React.createRef();
  }

  componentDidMount() {
    this.calculateMovingDistance();

    // calculate moving distance again when screen size changes for responsive
    window.addEventListener('resize', () => this.calculateMovingDistance());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.calculateMovingDistance());
  }

  calculateMovingDistance = () => {
    const { currentPositionX, currentPositionY } = this.state;
    // calculate robot moving distance according to table cell width
    const tableTopCellWidth = this.tableTopRef.clientWidth / 5;
    // adjust robot position if window size changes 
    this.robotRef.style.left = (currentPositionX * tableTopCellWidth) + 'px';
    this.robotRef.style.top = (currentPositionY  * tableTopCellWidth) + 'px';
    this.setState({ movingDistance: tableTopCellWidth });
  }

  moveRobot = (startTime, startingPoint, distance, direction, duration) => {
    const timestamp = new Date().getTime();
    const runTime = timestamp - startTime;
    let progress = runTime / duration;
    progress = Math.min(progress, 1);

    // change position of robot according to direction 
    switch(direction) {
      case 'up':
        this.robotRef.style.top = (startingPoint - (distance * progress)).toFixed(2) + 'px';
        break;
      case 'down':
        this.robotRef.style.top = (startingPoint + (distance * progress)).toFixed(2) + 'px';
        break;
      case 'left':
        this.robotRef.style.left = (startingPoint - (distance * progress)).toFixed(2) + 'px';
        break;
      case 'right':
        this.robotRef.style.left = (startingPoint + (distance * progress)).toFixed(2) + 'px';
        break;
      default: // do nothing
    }
    
    // keep repeating moving before time is up
    if (runTime < duration) { 
      requestAnimationFrame(() => 
         this.moveRobot(startTime, startingPoint, distance, direction, duration)
      );
    } else {
      this.setState({ moving: false });
      let newPositionX, newPositionY;
      const { currentPositionX, currentPositionY } = this.state;
      switch(direction) {
        case 'up':
          newPositionX = currentPositionX;
          newPositionY = currentPositionY - 1;
          break;
        case 'down':
          newPositionX = currentPositionX;
          newPositionY = currentPositionY + 1;
          break;
        case 'left':
          newPositionX = currentPositionX - 1;
          newPositionY = currentPositionY;
          break;
        case 'right':
          newPositionX = currentPositionX + 1;
          newPositionY = currentPositionY;
          break;
        default: // do nothing
      }
      this.setState({ currentPositionX: newPositionX, currentPositionY: newPositionY });
    }
  }

  handleMoveClick = (direction) => {
    if (!this.state.moving) {
      this.setState({ moving: true });
      // get different starting point before moving horizontally and vertically 
      const startingPoint = (direction === 'left' || direction === 'right') ? this.robotRef.offsetLeft : this.robotRef.offsetTop;
      const startTime = new Date().getTime();
  
      requestAnimationFrame(() => 
        this.moveRobot(startTime, startingPoint, this.state.movingDistance, direction, 600) 
      );
    }
  }

  renderTableTop = () => {
    const tableTopArray = [...Array(25).keys()];
    return <div className="tabletop" ref={node =>  this.tableTopRef = node}>
      {tableTopArray.map(item => 
        <div className="tabletop__item" key={item}></div>
      )}
    </div>
  }

  renderControlPanel = () => {
    return <div className="control-panel">
      <div className="navigations">
        <Button label='Up' type='up' handleClick={() => this.handleMoveClick('up')} />
        <Button label='Down' type='down' handleClick={() => this.handleMoveClick('down')} />
        <Button label='Left' type='left' handleClick={() => this.handleMoveClick('left')} />
        <Button label='Right' type='right' handleClick={() => this.handleMoveClick('right')} />
      </div>
    </div>
  }

  render() {
    return (
      <div className="container">
        <h1>Robot Play</h1>
        <div className="tabletop-container">
          {this.renderTableTop()}
          <Avatar type='robot' avatarRef={node =>  this.robotRef = node} />
        </div>
        {this.renderControlPanel()}
      </div>
    );
  }
}

export default App;
