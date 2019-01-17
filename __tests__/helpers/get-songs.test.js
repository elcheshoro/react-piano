import getSongs from '../../src/helpers/get-songs';

import { SONG_STOP } from '../../src/constants/song-event-types';

beforeEach(() => {
  localStorage.clear();
});

test('It returns the parsed songs if there are songs stored', () => {
  expect.assertions(1);
  localStorage.setItem('SONGS', '[{"name":"Test","events":[{"type":"SONG_STOP","time":50}]}]');
  expect(getSongs()).toEqual([
    {
      name: 'Test',
      events: [
        {
          type: SONG_STOP,
          time: 50,
        },
      ],
    },
  ]);
});

test('It returns and empty array if there are no songs stored', () => {
  expect.assertions(1);
  expect(getSongs()).toEqual([]);
});
