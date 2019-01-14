import React, { Component } from 'react';
import { KeyboardShortcuts, MidiNumbers, Piano as ReactPiano } from 'react-piano';

import Note from '../../helpers/note';

import MIDI_NOTES from './constants/midi-notes';

import 'react-piano/dist/styles.css';

export default class Piano extends Component {
  constructor() {
    super();
    this.currentNotes = {};
    this.handlePlayNote = this.handlePlayNote.bind(this);
    this.handleStopNote = this.handleStopNote.bind(this);
  }

  handlePlayNote(midiNote) {
    const currentNote = this.currentNotes[midiNote];
    if (currentNote) {
      currentNote.stop();
    }
    this.currentNotes[midiNote] = new Note(MIDI_NOTES[midiNote]);
  }

  handleStopNote(midiNote) {
    this.currentNotes[midiNote].fadeOut();
  }

  render() {
    const noteRange = {
      first: MidiNumbers.fromNote('a0'),
      last: MidiNumbers.fromNote('a1'),
    };

    const keyboardShortcuts = KeyboardShortcuts.create({
      firstNote: noteRange.first,
      lastNote: noteRange.last,
      keyboardConfig: KeyboardShortcuts.HOME_ROW,
    });

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
