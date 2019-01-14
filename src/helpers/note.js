export default class Note extends Audio {
  fadeOut() {
    const reduceVolume = setInterval(() => {
      if (this.volume >= 0.01) {
        this.volume -= 0.01;
      } else {
        clearInterval(reduceVolume);
      }
    }, 5);
  }
}
