import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../../components/button/button';
import Piano from '../../components/piano/piano';
import Timer from './components/timer';
import NewSongModal from '../new-song-modal/new-song-modal';

import finishNewSongAction from '../../actions/finish-new-song';

import { SONG_STOP } from '../../constants/song-event-types';

import './app.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isRecording: false,
      currentTime: 0,
      currentRecording: [],
    };
    this.handleStopClick = this.handleStopClick.bind(this);
    this.handleRecordClick = this.handleRecordClick.bind(this);
    this.incrementTime = this.incrementTime.bind(this);
    this.handlePianoEvent = this.handlePianoEvent.bind(this);
  }

  incrementTime() {
    const { currentTime } = this.state;
    this.setState({ currentTime: currentTime + 10 });
  }

  handleRecordClick() {
    this.setState({
      isRecording: true,
    });

    this.timerInterval = setInterval(this.incrementTime, 10);
  }

  handleStopClick() {
    const { currentRecording, currentTime } = this.state;
    const { finishNewSong } = this.props;
    this.setState({
      isRecording: false,
    });
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    finishNewSong([...currentRecording, {
      type: SONG_STOP,
      time: currentTime,
    }]);
    this.setState({
      currentTime: 0,
      currentRecording: [],
    });
  }

  handlePianoEvent(event) {
    const { currentRecording, currentTime, isRecording } = this.state;
    if (isRecording) {
      this.setState({
        currentRecording: [...currentRecording, {
          ...event,
          time: currentTime,
        }],
      });
    }
  }

  render() {
    const { isRecording, currentTime } = this.state;

    return (
      <div className="app">
        <div className="page-title">React Piano</div>
        <div className="piano-container">
          <Piano onEvent={this.handlePianoEvent} />
        </div>
        <div className="record-section">
          <Button onClick={isRecording ? this.handleStopClick : this.handleRecordClick}>
            <div className="record-button">{isRecording ? 'Stop' : 'Record'}</div>
          </Button>
          <Timer time={Math.floor(currentTime / 1000)} />
        </div>
        <NewSongModal />
      </div>
    );
  }
}

App.propTypes = {
  finishNewSong: PropTypes.func.isRequired,
};

const mapDispatchToProps = ({
  finishNewSong: songEvents => finishNewSongAction(songEvents),
});

export default connect(null, mapDispatchToProps)(App);
