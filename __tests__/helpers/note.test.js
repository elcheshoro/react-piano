import Note from '../../src/helpers/note';

beforeEach(() => {
  jest.useFakeTimers();
  window.Audio.prototype.play = jest.fn();
});

test('It plays the audio when the note is created', () => {
  expect.assertions(1);
  const note = new Note();
  expect(note.audio.play).toHaveBeenCalled();
});

test('It fades out the volume to 0', () => {
  expect.assertions(1);
  const note = new Note();
  note.fadeOut();
  jest.runAllTimers();
  expect(note.audio.volume).toEqual(0);
});
