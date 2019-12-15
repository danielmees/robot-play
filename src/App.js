import React, { Component } from 'react';
import './App.scss';
import Avatar from './components/Avatar';
import Button from './components/Button';
import Input from './components/Input';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentPositionX: 0,
      currentPositionY: 0,
      moving: false,
      movingDistance: 0,
      resetPositionX: '',
      resetPositionY: '',
      commandInvalidMessage: '',
      crownPositionX: 0,
      crownPositionY: 0,
      happyMessage: ''
    };

    this.robotRef = React.createRef();
    this.crownRef = React.createRef();
  }

  componentDidMount() {
    this.calculateMovingDistance();
    this.placeCrown();
    // calculate moving distance again when screen size changes for responsive
    window.addEventListener('resize', () => this.calculateMovingDistance());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.calculateMovingDistance());
  }

  generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  placeCrown() {
    let crownPositionX = this.generateRandomNumber(0, 4);
    let crownPositionY = this.generateRandomNumber(0, 4);
    // redo placement if the location is the same as the robot
    if (crownPositionX === 0 && crownPositionY === 0) {
      this.placeCrown();
    } else {
      this.setState({ crownPositionX, crownPositionY });
      const tableTopCellWidth = this.tableTopRef.clientWidth / 5;
      this.crownRef.style.left = (crownPositionX * tableTopCellWidth) + 'px';
      this.crownRef.style.top = (crownPositionY  * tableTopCellWidth) + 'px';
    }
  }

  calculateMovingDistance() {
    const { currentPositionX, currentPositionY, crownPositionX, crownPositionY } = this.state;
    // calculate robot moving distance according to table cell width
    const tableTopCellWidth = this.tableTopRef.clientWidth / 5;
    // adjust robot position if window size changes 
    this.robotRef.style.left = (currentPositionX * tableTopCellWidth) + 'px';
    this.robotRef.style.top = (currentPositionY  * tableTopCellWidth) + 'px';
    this.setState({ movingDistance: tableTopCellWidth }, () => {
      // adjust position of crown for window resize
      if (crownPositionX !== 0 && crownPositionY !== 0) {
        this.crownRef.style.left = (crownPositionX * this.state.movingDistance) + 'px';
        this.crownRef.style.top = (crownPositionY  * this.state.movingDistance) + 'px';
      }
    });
  }

  calculateNewPositions(direction) {
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
    return { newPositionX, newPositionY };
  }

  moveRobot(startTime, startingPoint, distance, direction, duration) {
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
      const { newPositionX, newPositionY } = this.calculateNewPositions(direction);
      this.setState({ currentPositionX: newPositionX, currentPositionY: newPositionY });
      if (newPositionX === this.state.crownPositionX && newPositionY === this.state.crownPositionY) {
        this.setState({ happyMessage: 'Oh, there is a crown!' });
      }
    }
  }


  handleMoveClick(direction) {
    this.setState({ commandInvalidMessage: '', happyMessage: '' });
    const { newPositionX, newPositionY } = this.calculateNewPositions(direction);
    if (newPositionX < 0 || newPositionX > 4 || newPositionY < 0 || newPositionY > 4) {
      this.setState({ commandInvalidMessage: "I am at the edge, can't move further!" });
    } else if (!this.state.moving) {
      this.setState({ moving: true });
      // get different starting point before moving horizontally and vertically 
      const startingPoint = (direction === 'left' || direction === 'right') ? this.robotRef.offsetLeft : this.robotRef.offsetTop;
      const startTime = new Date().getTime();
  
      requestAnimationFrame(() => 
        this.moveRobot(startTime, startingPoint, this.state.movingDistance, direction, 600) 
      );
    }
  }

  reSetRobotPosition() {
    this.setState({ commandInvalidMessage: '', happyMessage: '' });
    const { currentPositionX, currentPositionY, movingDistance, resetPositionX, resetPositionY, crownPositionX, crownPositionY } = this.state;
    // validate command commandInvalidMessage
    if (!resetPositionX || !resetPositionY) {
      this.setState({ commandInvalidMessage: 'Please type position number(s).' });
    } else if (resetPositionX < 0 || resetPositionX > 4 || resetPositionY < 0 || resetPositionY > 4) {
      this.setState({ commandInvalidMessage: 'Invalid command!' });
    } else if (resetPositionX === currentPositionX && resetPositionY === currentPositionY ) {
      this.setState({ commandInvalidMessage: 'Same location!' });
    } else {
      this.robotRef.style.left = (resetPositionX * movingDistance) + 'px';
      this.robotRef.style.top = (resetPositionY  * movingDistance) + 'px';
      this.setState({ currentPositionX: resetPositionX, currentPositionY: resetPositionY });
      if (resetPositionX === crownPositionX && resetPositionY === crownPositionY) {
        this.setState({ happyMessage: 'Oh, there is a crown!' });
      }
    }
  }

  renderTableTop() {
    const tableTopArray = [...Array(25).keys()];
    return <div className="tabletop" ref={node =>  this.tableTopRef = node}>
      {tableTopArray.map(item => 
        <div className="tabletop__item" key={item}></div>
      )}
    </div>
  }

  renderControlPanel() {
    const { resetPositionX, resetPositionY } = this.state;
    return <div className="control-panel">
      <div className="navigations">
        <Button label='Up' type='up' handleClick={() => this.handleMoveClick('up')} />
        <Button label='Down' type='down' handleClick={() => this.handleMoveClick('down')} />
        <Button label='Left' type='left' handleClick={() => this.handleMoveClick('left')} />
        <Button label='Right' type='right' handleClick={() => this.handleMoveClick('right')} />
      </div>
      <div className="reset-btns">
        <Input placeholder='X' 
          onChange={(evt) => this.setState({ resetPositionX: parseInt(evt.target.value, 10) })} 
          value={isNaN(resetPositionX) ? '' : resetPositionX}
          />
        <Input placeholder='Y' 
          onChange={(evt) => this.setState({ resetPositionY: parseInt(evt.target.value, 10) })} 
          value={isNaN(resetPositionY) ? '' : resetPositionY}
        />
        <Button label='Set Position' type='big' handleClick={() => this.reSetRobotPosition()} />
      </div>
    </div>
  }

  render() {
    const { currentPositionX, currentPositionY, commandInvalidMessage, crownPositionX, crownPositionY, happyMessage } = this.state;
    return (
      <div className="container">
        <h1>Robot Play</h1>
        <div className="status">
          Status: &nbsp;&nbsp;
          <span>X: <strong>{currentPositionX}</strong></span>
          <span>Y: <strong>{currentPositionY}</strong></span>
        </div>
        <div className="tabletop-container">
          {this.renderTableTop()}
          <Avatar 
            type='robot' 
            avatarRef={node =>  this.robotRef = node} 
            sadResponse={commandInvalidMessage}
            happyResponse={happyMessage}
          />
          <Avatar 
            type='crown' 
            avatarRef={node =>  this.crownRef = node} 
            hidden={currentPositionX === crownPositionX && currentPositionY === crownPositionY}
          />
        </div>
        {this.renderControlPanel()}
      </div>
    );
  }
}

export default App;
