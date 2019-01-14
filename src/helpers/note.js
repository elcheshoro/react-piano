export default class Note {
  constructor(sound) {
    this.audio = new Audio(sound);
    this.play();
  }

  play() {
    this.audio.play();
    // This stops the abrupt ending of the note
    this.timeout = setTimeout(() => {
      this.fadeOut();
    }, 2500);
  }

  stop() {
    this.audio.pause();
  }

  fadeOut() {
    const reduceVolume = setInterval(() => {
      if (this.audio.volume >= 0.01) {
        this.audio.volume -= 0.01;
      } else {
        this.audio.volume = 0;
        clearInterval(reduceVolume);
      }
    }, 5);
  }
}
