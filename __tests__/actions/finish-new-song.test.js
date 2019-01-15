import finishNewSong from '../../src/actions/finish-new-song';

import { NEW_SONG_FINISHED } from '../../src/constants/actions';
import { SONG_STOP } from '../../src/constants/song-event-types';

test('It dispatches a finish new song action', () => {
  expect.assertions(1);
  const songEvents = [
    {
      type: SONG_STOP,
      time: 50,
    },
  ];
  expect(finishNewSong(songEvents)).toEqual({
    type: NEW_SONG_FINISHED,
    songEvents,
  });
});
