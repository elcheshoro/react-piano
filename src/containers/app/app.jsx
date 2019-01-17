import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Piano from '../../components/piano/piano';
import NewSongModal from '../new-song-modal/new-song-modal';
import SongList from '../song-list/song-list';
import RecordSection from './components/record-section';

import Recording from './helpers/recording';
import finishNewSongAction from '../../actions/finish-new-song';

import './app.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isRecording: false,
      recordingTime: 0,
    };
    this.currentRecording = null;
    this.handleStopClick = this.handleStopClick.bind(this);
    this.handleRecordClick = this.handleRecordClick.bind(this);
    this.handlePianoEvent = this.handlePianoEvent.bind(this);
    this.handleRecordingTimeChange = this.handleRecordingTimeChange.bind(this);
  }

  handleRecordingTimeChange(recordingTime) {
    this.setState({
      recordingTime,
    });
  }

  handleRecordClick() {
    this.setState({
      isRecording: true,
    });
    this.currentRecording = new Recording(this.handleRecordingTimeChange);
  }

  handleStopClick() {
    const { finishNewSong } = this.props;
    this.setState({
      isRecording: false,
      recordingTime: 0,
    });
    this.currentRecording.end();
    finishNewSong(this.currentRecording.events);
    this.currentRecording = null;
  }

  handlePianoEvent(event) {
    const { isRecording } = this.state;
    if (isRecording) {
      this.currentRecording.addEvent(event);
    }
  }

  render() {
    const { isRecording, recordingTime } = this.state;
    const { newSongEvents } = this.props;

    return (
      <div className="app">
        <div className="page-title">React Piano</div>
        <div className="piano-container">
          <Piano onEvent={this.handlePianoEvent} disabled={newSongEvents !== null} />
        </div>
        <RecordSection
          isRecording={isRecording}
          currentTime={recordingTime}
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
