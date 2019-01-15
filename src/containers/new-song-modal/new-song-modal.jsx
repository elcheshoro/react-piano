import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../../components/button/button';
import TextInput from '../../components/text-input/text-input';

import discardNewSongAction from '../../actions/discard-new-song';
import saveNewSongAction from '../../actions/save-new-song';

import './new-song-modal.scss';

class NewSongModal extends Component {
  constructor() {
    super();
    this.state = {
      songName: '',
    };
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleDiscardClick = this.handleDiscardClick.bind(this);
    this.handleSongNameChange = this.handleSongNameChange.bind(this);
  }

  handleSongNameChange(value) {
    this.setState({
      songName: value,
    });
  }

  handleSaveClick() {
    const { saveNewSong } = this.props;
    const { songName } = this.state;
    saveNewSong(songName);
    this.setState({
      songName: '',
    });
  }

  handleDiscardClick() {
    const { discardNewSong } = this.props;
    this.setState({
      songName: '',
    });
    discardNewSong();
  }

  render() {
    const { songName } = this.state;
    const { newSongEvents } = this.props;
    if (!newSongEvents) {
      return null;
    }

    return (
      <div className="new-song-modal">
        <div className="background" />
        <div className="modal-content">
          <div className="title">Save New Song</div>
          <TextInput
            onChange={this.handleSongNameChange}
            placeholder="Please enter a name"
            value={songName}
          />
          <div className="action-container">
            <Button onClick={this.handleDiscardClick}>Discard</Button>
            <Button disabled={!songName} onClick={this.handleSaveClick}>Save</Button>
          </div>
        </div>
      </div>
    );
  }
}

NewSongModal.propTypes = {
  discardNewSong: PropTypes.func.isRequired,
  saveNewSong: PropTypes.func.isRequired,
  newSongEvents: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    midiNote: PropTypes.number,
  })).isRequired,
};

const mapStateToProps = state => ({
  newSongEvents: state.songs.get('newSongEvents'),
});

const mapDispatchToProps = ({
  discardNewSong: discardNewSongAction,
  saveNewSong: song => saveNewSongAction(song),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewSongModal);
