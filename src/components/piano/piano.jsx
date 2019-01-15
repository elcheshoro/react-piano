import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { KeyboardShortcuts, MidiNumbers, Piano as ReactPiano } from 'react-piano';

import Note from '../../helpers/note';
import { KEY_UP, KEY_DOWN } from '../../constants/song-event-types';

import 'react-piano/dist/styles.css';

class Piano extends Component {
  constructor() {
    super();
    this.currentNotes = {};
    this.handlePlayNote = this.handlePlayNote.bind(this);
    this.handleStopNote = this.handleStopNote.bind(this);
  }

  handlePlayNote(midiNote) {
    const { onEvent } = this.props;
    onEvent({
      midiNote,
      type: KEY_DOWN,
    });
    const currentNote = this.currentNotes[midiNote];
    if (currentNote) {
      currentNote.stop();
    }
    this.currentNotes[midiNote] = new Note(midiNote);
  }

  handleStopNote(midiNote) {
    const { onEvent } = this.props;
    onEvent({
      midiNote,
      type: KEY_UP,
    });
    this.currentNotes[midiNote].fadeOut();
  }

  render() {
    const { disabled } = this.props;
    const noteRange = {
      first: MidiNumbers.fromNote('a0'),
      last: MidiNumbers.fromNote('a1'),
    };

    const keyboardShortcuts = disabled !== true ? KeyboardShortcuts.create({
      firstNote: noteRange.first,
      lastNote: noteRange.last,
      keyboardConfig: KeyboardShortcuts.HOME_ROW,
    }) : null;

    return (
      <ReactPiano
        noteRange={noteRange}
        playNote={this.handlePlayNote}
        stopNote={this.handleStopNote}
        keyboardShortcuts={keyboardShortcuts}
      />
    );
  }
}

Piano.defaultProps = {
  disabled: false,
};

Piano.propTypes = {
  onEvent: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Piano;
