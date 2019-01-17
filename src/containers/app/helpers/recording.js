import { SONG_STOP } from '../../../constants/song-event-types';

export default class Recording {
  constructor(onTimeChange) {
    this.onTimeChange = onTimeChange;
    this.time = 0;
    this.timerInterval = setInterval(() => this.incrementTime(), 10);
    this.events = [];
  }

  incrementTime() {
    this.time += 10;
    if (this.time % 1000 === 0) {
      // Every second increment the time for the recording timer
      this.onTimeChange(this.time / 1000);
    }
  }

  addEvent(event) {
    this.events = [...this.events, {
      ...event,
      time: this.time,
    }];
  }

  end() {
    clearInterval(this.timerInterval);
    this.events = [...this.events, {
      type: SONG_STOP,
      time: this.time,
    }];
  }
}
