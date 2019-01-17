import React from 'react';
import { shallow } from 'enzyme';

import Button from '../../../../src/components/button/button';
import SongItem from '../../../../src/containers/song-list/components/song-item';
import Song from '../../../../src/containers/song-list/helpers/song';

import { SONG_STOP } from '../../../../src/constants/song-event-types';

jest.mock('../../../../src/containers/song-list/helpers/song');

test('Initially the play button is not disabled', () => {
  expect.assertions(1);
  const wrapper = shallow(<SongItem name="mysong" events={[{ type: SONG_STOP, time: 500 }]} />);
  expect(wrapper.find(Button).props().disabled).toEqual(false);
});

test('It disables the play button while the song is being played', () => {
  expect.assertions(1);
  const wrapper = shallow(<SongItem name="mysong" events={[{ type: SONG_STOP, time: 500 }]} />);
  Song.prototype.play.mockReturnValue(new Promise(() => {}));
  wrapper.find(Button).props().onClick();
  expect(wrapper.find(Button).props().disabled).toEqual(true);
});

test('The button stop being disabled once a song finishes playing', () => {
  expect.assertions(1);
  const wrapper = shallow(<SongItem name="mysong" events={[{ type: SONG_STOP, time: 500 }]} />);
  Song.prototype.play.mockReturnValue(Promise.resolve());
  wrapper.find(Button).props().onClick();
  expect(wrapper.find(Button).props().disabled).toEqual(true);
});
