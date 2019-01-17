import storeSongs from '../../src/helpers/store-songs';

import { SONG_STOP } from '../../src/constants/song-event-types';

beforeEach(() => {
  localStorage.clear();
});

test('It stores the json string in local storage', () => {
  expect.assertions(1);
  storeSongs([
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
  expect(localStorage.getItem('SONGS')).toEqual('[{"name":"Test","events":[{"type":"SONG_STOP","time":50}]}]');
});
