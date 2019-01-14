export default class Note {
  constructor(sound) {
    this.audio = new Audio(sound);
    this.audio.play();
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
