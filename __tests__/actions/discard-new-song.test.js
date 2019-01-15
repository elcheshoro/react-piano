import discardNewSong from '../../src/actions/discard-new-song';

import { DISCARD_NEW_SONG } from '../../src/constants/actions';

test('It dispatches a discard new song action', () => {
  expect.assertions(1);
  expect(discardNewSong()).toEqual({
    type: DISCARD_NEW_SONG,
  });
});
