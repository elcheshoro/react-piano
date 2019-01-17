import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Piano from '../../components/piano/piano';
import NewSongModal from '../new-song-modal/new-song-modal';
import SongList from '../song-list/song-list';
import RecordSection from './components/record-section';

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
    const { currentTime, isRecording } = this.state;
    const { newSongEvents } = this.props;

    return (
      <div className="app">
        <div className="page-title">React Piano</div>
        <div className="piano-container">
          <Piano onEvent={this.handlePianoEvent} disabled={newSongEvents !== null} />
        </div>
        <RecordSection
          isRecording={isRecording}
          currentTime={currentTime}
          onRecordClick={this.handleRecordClick}
          onStopClick={this.handleStopClick}
        />
        <div className="songs">
          <div className="title">My Songs</div>
          <SongList />
        </div>
        <NewSongModal />
      </div>
    );
  }
}

App.defaultProps = {
  newSongEvents: null,
};

App.propTypes = {
  newSongEvents: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    midiNote: PropTypes.number,
  })),
  finishNewSong: PropTypes.func.isRequired,
};

const mpaStateToProps = state => ({
  newSongEvents: state.songs.get('newSongEvents'),
});

const mapDispatchToProps = ({
  finishNewSong: songEvents => finishNewSongAction(songEvents),
});

export default connect(mpaStateToProps, mapDispatchToProps)(App);
