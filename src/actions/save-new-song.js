import { SAVE_NEW_SONG } from '../constants/actions';

export default name => ({
  type: SAVE_NEW_SONG,
  songName: name,
});
