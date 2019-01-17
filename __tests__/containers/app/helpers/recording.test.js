import Recording from '../../../../src/containers/app/helpers/recording';
import { KEY_DOWN, SONG_STOP } from '../../../../src/constants/song-event-types';

beforeEach(() => {
  jest.useFakeTimers();
});

test('It calls the on time change handler every second', () => {
  expect.assertions(3);
  const onTimeChange = jest.fn();
  const recording = new Recording(onTimeChange);

  // This will simulate 2 seconds passing
  for (let i = 0; i < 200; i += 1) {
    jest.runOnlyPendingTimers();
  }

  recording.end();
  expect(onTimeChange).toHaveBeenCalledTimes(2);
  expect(onTimeChange).toHaveBeenCalledWith(1);
  expect(onTimeChange).toHaveBeenCalledWith(2);
});

test('It stops the timer once the recording has ended', () => {
  expect.assertions(3);
  const onTimeChange = jest.fn();
  const recording = new Recording(onTimeChange);

  // This will simulate 2 seconds passing
  for (let i = 0; i < 200; i += 1) {
    jest.runOnlyPendingTimers();
  }

  recording.end();

  // This will simulate 1 second passing
  for (let i = 0; i < 100; i += 1) {
    jest.runOnlyPendingTimers();
  }

  expect(onTimeChange).toHaveBeenCalledTimes(2);
  expect(onTimeChange).toHaveBeenCalledWith(1);
  expect(onTimeChange).toHaveBeenCalledWith(2);
});

test('It adds the event to recordings events when one occurs', () => {
  expect.assertions(1);
  const recording = new Recording(jest.fn());

  // This will simulate 1.5 seconds passing
  for (let i = 0; i < 150; i += 1) {
    jest.runOnlyPendingTimers();
  }

  recording.addEvent({
    type: KEY_DOWN,
    midiNote: 25,
  });

  expect(recording.events).toEqual([
    {
      type: KEY_DOWN,
      midiNote: 25,
      time: 1500, // To match the simulated 1.5 seconds
    },
  ]);
});

test('It adds a song end event to recordings events the song ends', () => {
  expect.assertions(1);
  const recording = new Recording(jest.fn());

  // This will simulate 1.5 seconds passing
  for (let i = 0; i < 150; i += 1) {
    jest.runOnlyPendingTimers();
  }

  recording.end();

  expect(recording.events).toEqual([
    {
      type: SONG_STOP,
      time: 1500, // To match the simulated 1.5 seconds
    },
  ]);
});
