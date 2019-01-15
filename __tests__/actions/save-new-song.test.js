import saveNewSong from '../../src/actions/save-new-song';

import { SAVE_NEW_SONG } from '../../src/constants/actions';

test('It dispatches a finish new song action', () => {
  expect.assertions(1);
  expect(saveNewSong('my_song')).toEqual({
    type: SAVE_NEW_SONG,
    songName: 'my_song',
  });
});
