import { KEY_DOWN, KEY_UP, SONG_STOP } from '../../../constants/song-event-types';
import Note from '../../../helpers/note';

export default class Song {
  constructor(events) {
    this.events = events;
    this.time = 0;
    this.lastEvent = 0;
    this.currentNotes = {};
  }

  play() {
    this.interval = setInterval(() => {
      this.time += 10;
      for (let i = this.lastEvent; i < this.events.length; i += 1) {
        const { midiNote, time, type } = this.events[i];
        if (time !== this.time) {
          break;
        }
        this.lastEvent += 1;
        switch (type) {
          case KEY_DOWN: {
            if (this.currentNotes[midiNote]) {
              this.currentNotes[midiNote].fadeOut();
            }
            this.currentNotes[midiNote] = new Note(midiNote);
            break;
          }
          case KEY_UP:
            this.currentNotes[midiNote].fadeOut();
            break;
          case SONG_STOP:
            clearInterval(this.interval);
            break;
          default:
            throw new Error('Invalid song event');
        }
      }
    }, 10);
  }
}
