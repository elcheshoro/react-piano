import { NEW_SONG_FINISHED } from '../constants/actions';

export default songEvents => ({
  type: NEW_SONG_FINISHED,
  songEvents,
});
