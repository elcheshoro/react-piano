import { Map } from 'immutable';
import {
  NEW_SONG_FINISHED,
  DISCARD_NEW_SONG,
  SAVE_NEW_SONG,
} from '../constants/actions';

const initialStateMap = Map({
  newSongEvents: null,
  songs: [],
});

export default (state = initialStateMap, action) => {
  switch (action.type) {
    case NEW_SONG_FINISHED:
      return state
        .set('newSongEvents', action.songEvents);
    case DISCARD_NEW_SONG:
      return state
        .set('newSongEvents', null);
    case SAVE_NEW_SONG:
      return state
        .set('newSongEvents', null)
        .set('songs', [{
          events: state.get('newSongEvents'),
          name: action.songName,
        }].concat(state.get('songs')));
    default:
      return state;
  }
};
