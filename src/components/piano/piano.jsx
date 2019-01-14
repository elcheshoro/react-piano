import React, { Component } from 'react';
import { MidiNumbers, Piano as ReactPiano } from 'react-piano';

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
      currentNote.pause();
    }
    this.currentNotes[midiNote] = new Note(MIDI_NOTES[midiNote]);
    this.currentNotes[midiNote].play();
  }

  handleStopNote(midiNote) {
    this.currentNotes[midiNote].fadeOut();
  }

  render() {
    const noteRange = {
      first: MidiNumbers.fromNote('a0'),
      last: MidiNumbers.fromNote('a1'),
    };

    return (
      <ReactPiano
        noteRange={noteRange}
        playNote={this.handlePlayNote}
        stopNote={this.handleStopNote}
        width={500}
      />
    );
  }
}
