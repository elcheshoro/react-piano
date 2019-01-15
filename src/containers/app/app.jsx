import React, { Component } from 'react';

import Button from '../../components/button/button';
import Piano from '../../components/piano/piano';
import Timer from './components/timer';

import './app.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isRecording: false,
      currentTime: 0,
    };
    this.handleRecordingToggle = this.handleRecordingToggle.bind(this);
    this.incrementTime = this.incrementTime.bind(this);
  }

  incrementTime() {
    const { currentTime } = this.state;
    this.setState({ currentTime: currentTime + 10 });
  }

  handleRecordingToggle() {
    const { isRecording } = this.state;
    this.setState({
      isRecording: !isRecording,
    });
    if (!isRecording) {
      this.timerInterval = setInterval(this.incrementTime, 10);
    } else {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
      this.setState({
        currentTime: 0,
      });
    }
  }

  render() {
    const { isRecording, currentTime } = this.state;

    return (
      <div className="app">
        <div className="page-title">React Piano</div>
        <div className="piano-container">
          <Piano />
        </div>
        <div className="record-section">
          <Button onClick={this.handleRecordingToggle}>
            <div className="record-button">{isRecording ? 'Stop' : 'Record'}</div>
          </Button>
          <Timer time={Math.floor(currentTime / 1000)} />
        </div>
      </div>
    );
  }
}

export default App;
