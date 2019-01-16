import React from 'react';
import { shallow } from 'enzyme';

import { NewSongModal } from '../../../src/containers/new-song-modal/new-song-modal';
import TextInput from '../../../src/components/text-input/text-input';
import Button from '../../../src/components/button/button';

import { SONG_STOP } from '../../../src/constants/song-event-types';

test('It displays nothing if there is no new song', () => {
  expect.assertions(1);
  const wrapper = shallow(
    <NewSongModal
      newSongEvents={null}
      discardNewSong={jest.fn()}
      saveNewSong={jest.fn()}
    />,
  );
  expect(wrapper.getElement()).toEqual(null);
});

test('It renders the modal if there is a new song', () => {
  expect.assertions(1);
  const wrapper = shallow(
    <NewSongModal
      newSongEvents={[
        {
          type: SONG_STOP,
          time: 50,
        },
      ]}
      discardNewSong={jest.fn()}
      saveNewSong={jest.fn()}
    />,
  );
  expect(wrapper.getElement()).not.toEqual(null);
});

test('It resets the song name when the song is discarded', () => {
  expect.assertions(2);
  const wrapper = shallow(
    <NewSongModal
      newSongEvents={[
        {
          type: SONG_STOP,
          time: 50,
        },
      ]}
      discardNewSong={jest.fn()}
      saveNewSong={jest.fn()}
    />,
  );
  wrapper.find(TextInput).props().onChange('NewSong');
  expect(wrapper.find(TextInput).props().value).toEqual('NewSong');
  wrapper.find(Button).get(0).props.onClick();
  expect(wrapper.find(TextInput).props().value).toEqual('');
});

test('It calls the discard new song prop when the discard button is clicked', () => {
  expect.assertions(1);
  const discardNewSong = jest.fn();
  const wrapper = shallow(
    <NewSongModal
      newSongEvents={[
        {
          type: SONG_STOP,
          time: 50,
        },
      ]}
      discardNewSong={discardNewSong}
      saveNewSong={jest.fn()}
    />,
  );
  wrapper.find(TextInput).props().onChange('NewSong');
  wrapper.find(Button).get(0).props.onClick();
  expect(discardNewSong).toHaveBeenCalled();
});

test('The save button is disabled when no song name has been entered', () => {
  expect.assertions(1);
  const discardNewSong = jest.fn();
  const wrapper = shallow(
    <NewSongModal
      newSongEvents={[
        {
          type: SONG_STOP,
          time: 50,
        },
      ]}
      discardNewSong={discardNewSong}
      saveNewSong={jest.fn()}
    />,
  );
  expect(wrapper.find(Button).get(1).props.disabled).toEqual(true);
});

test('The save button is not disabled when a song name has been entered', () => {
  expect.assertions(1);
  const discardNewSong = jest.fn();
  const wrapper = shallow(
    <NewSongModal
      newSongEvents={[
        {
          type: SONG_STOP,
          time: 50,
        },
      ]}
      discardNewSong={discardNewSong}
      saveNewSong={jest.fn()}
    />,
  );
  wrapper.find(TextInput).props().onChange('NewSong');
  expect(wrapper.find(Button).get(1).props.disabled).toEqual(false);
});

test('It resets the song name when the song is saved', () => {
  expect.assertions(2);
  const wrapper = shallow(
    <NewSongModal
      newSongEvents={[
        {
          type: SONG_STOP,
          time: 50,
        },
      ]}
      discardNewSong={jest.fn()}
      saveNewSong={jest.fn()}
    />,
  );
  wrapper.find(TextInput).props().onChange('NewSong');
  expect(wrapper.find(TextInput).props().value).toEqual('NewSong');
  wrapper.find(Button).get(1).props.onClick();
  expect(wrapper.find(TextInput).props().value).toEqual('');
});

test('It calls the save new song props when the song is saved', () => {
  expect.assertions(1);
  const saveNewSong = jest.fn();
  const wrapper = shallow(
    <NewSongModal
      newSongEvents={[
        {
          type: SONG_STOP,
          time: 50,
        },
      ]}
      discardNewSong={jest.fn()}
      saveNewSong={saveNewSong}
    />,
  );
  wrapper.find(TextInput).props().onChange('NewSong');
  wrapper.find(Button).get(1).props.onClick();
  expect(saveNewSong).toHaveBeenCalled();
});
