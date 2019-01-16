import { Map } from 'immutable';
import uuid from 'uuid/v4';

import songs from '../../src/reducers/songs';
import getSongs from '../../src/helpers/get-songs';

import { SONG_STOP } from '../../src/constants/song-event-types';
import { NEW_SONG_FINISHED, DISCARD_NEW_SONG, SAVE_NEW_SONG } from '../../src/constants/actions';

jest.mock('../../src/helpers/get-songs');
jest.mock('../../src/helpers/store-songs');
jest.mock('uuid/v4');

beforeEach(() => {
  getSongs.mockReturnValue([]);
});

test('It leaves the state unaltered for an unhandled action type', () => {
  expect.assertions(2);
  const newSongEvents = [
    {
      type: SONG_STOP,
      time: 50,
    },
  ];
  const initialStateMap = Map({
    newSongEvents,
    songs: [],
  });
  const action = {
    type: 'SOME_UNHANDLED_TYPE',
  };

  const newState = songs(initialStateMap, action);
  expect(newState.get('newSongEvents')).toEqual(newSongEvents);
  expect(newState.get('songs')).toEqual([]);
});

test('It sets the new song for a new song finished action', () => {
  expect.assertions(2);
  const newSongEvents = [
    {
      type: SONG_STOP,
      time: 50,
    },
  ];
  const initialStateMap = Map({
    newSongEvents: null,
    songs: [],
  });
  const action = {
    type: NEW_SONG_FINISHED,
    songEvents: newSongEvents,
  };

  const newState = songs(initialStateMap, action);
  expect(newState.get('newSongEvents')).toEqual(newSongEvents);
  expect(newState.get('songs')).toEqual([]);
});

test('It unsets the new song for a discard new song action', () => {
  expect.assertions(2);
  const initialStateMap = Map({
    newSongEvents: [
      {
        type: SONG_STOP,
        time: 50,
      },
    ],
    songs: [],
  });
  const action = {
    type: DISCARD_NEW_SONG,
  };

  const newState = songs(initialStateMap, action);
  expect(newState.get('newSongEvents')).toEqual(null);
  expect(newState.get('songs')).toEqual([]);
});

test('It adds the new song to the songs array for a new song save action', () => {
  expect.assertions(2);
  uuid.mockReturnValue('123-123-123-123');
  const newSongEvents = [
    {
      type: SONG_STOP,
      time: 50,
    },
  ];
  const initialStateMap = Map({
    newSongEvents,
    songs: [
      {
        id: '321-321-321-321',
        name: 'my_first_song',
        events: [
          {
            type: SONG_STOP,
            time: 100,
          },
        ],
      },
    ],
  });
  const action = {
    type: SAVE_NEW_SONG,
    songName: 'my_new_song',
  };

  const newState = songs(initialStateMap, action);
  expect(newState.get('newSongEvents')).toEqual(null);
  expect(newState.get('songs')).toEqual([
    {
      id: '123-123-123-123',
      name: 'my_new_song',
      events: [
        {
          type: SONG_STOP,
          time: 50,
        },
      ],
    },
    {
      id: '321-321-321-321',
      name: 'my_first_song',
      events: [
        {
          type: SONG_STOP,
          time: 100,
        },
      ],
    },
  ]);
});
