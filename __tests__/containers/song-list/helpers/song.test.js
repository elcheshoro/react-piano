import Note from '../../../../src/helpers/note';
import Song from '../../../../src/containers/song-list/helpers/song';

import { KEY_DOWN, KEY_UP, SONG_STOP } from '../../../../src/constants/song-event-types';

jest.mock('../../../../src/helpers/note');

beforeEach(() => {
  jest.useFakeTimers();
});

test('when playing the song it resolves once a song finishes', () => {
  expect.assertions(0);
  const events = [
    {
      type: SONG_STOP,
      time: 50,
    },
  ];

  const song = new Song(events);
  // The test will fail if the promise does not resolve
  return new Promise((resolve) => {
    song.play().then(() => resolve());
    jest.runAllTimers();
  });
});

test('When playing the song it does not do anything if there is no event at the time interval', () => {
  expect.assertions(1);
  const events = [
    {
      type: SONG_STOP,
      time: 50,
    },
  ];

  const song = new Song(events);

  song.play();
  jest.runOnlyPendingTimers();
  jest.runOnlyPendingTimers();
  jest.runOnlyPendingTimers();
  expect(Note).not.toHaveBeenCalled();
});

test('When playing the song it plays the note if a key down event occurs', () => {
  expect.assertions(1);
  const events = [
    {
      type: KEY_DOWN,
      midiNote: 25,
      time: 20,
    },
    {
      type: SONG_STOP,
      time: 50,
    },
  ];

  const song = new Song(events);

  song.play();
  jest.runOnlyPendingTimers();
  jest.runOnlyPendingTimers();
  expect(Note).toHaveBeenCalledWith(25);
});

test('When playing the song it fades the note out if a key down event occurs while the note is already playing', () => {
  expect.assertions(1);
  const events = [
    {
      type: KEY_DOWN,
      midiNote: 25,
      time: 20,
    },
    {
      type: KEY_DOWN,
      midiNote: 25,
      time: 30,
    },
    {
      type: SONG_STOP,
      time: 50,
    },
  ];

  const song = new Song(events);

  song.play();
  jest.runOnlyPendingTimers();
  jest.runOnlyPendingTimers();
  jest.runOnlyPendingTimers();
  expect(Note.prototype.fadeOut).toHaveBeenCalled();
});


test('When playing the song it fades the note out if a key up event occurs', () => {
  expect.assertions(1);
  const events = [
    {
      type: KEY_DOWN,
      midiNote: 25,
      time: 20,
    },
    {
      type: KEY_UP,
      midiNote: 25,
      time: 30,
    },
    {
      type: SONG_STOP,
      time: 50,
    },
  ];

  const song = new Song(events);

  song.play();
  jest.runOnlyPendingTimers();
  jest.runOnlyPendingTimers();
  jest.runOnlyPendingTimers();
  expect(Note.prototype.fadeOut).toHaveBeenCalled();
});

test('It rejects with an error if an unhandled event type occurs', () => {
  expect.assertions(1);
  const events = [
    {
      type: 'UNHANDLED_EVENT',
      midiNote: 25,
      time: 10,
    },
  ];

  const song = new Song(events);

  return new Promise((resolve) => {
    song.play()
      .catch((error) => {
        expect(error).toEqual(new Error('Invalid song event'));
        resolve();
      });
    jest.runOnlyPendingTimers();
  });
});
