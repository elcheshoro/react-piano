import React from 'react';
import { shallow } from 'enzyme';

import { App } from '../../../src/containers/app/app';
import Piano from '../../../src/components/piano/piano';
import RecordSection from '../../../src/containers/app/components/record-section';

import Recording from '../../../src/containers/app/helpers/recording';

import { KEY_DOWN } from '../../../src/constants/song-event-types';

jest.mock('../../../src/containers/app/helpers/recording');

beforeEach(() => {
  jest.resetAllMocks();
  jest.resetModules();
});

test('It does not add the piano event to the recording if the app is not recording', () => {
  expect.assertions(1);
  const wrapper = shallow(<App newSongEvents={null} finishNewSong={jest.fn()} />);
  wrapper.find(Piano).props().onEvent({
    type: KEY_DOWN,
    midiNote: 25,
    time: 500,
  });
  expect(Recording.prototype.addEvent).not.toHaveBeenCalled();
});

test('It adds the piano event to the recording if the app is recording', () => {
  expect.assertions(1);
  const wrapper = shallow(<App newSongEvents={null} finishNewSong={jest.fn()} />);
  wrapper.find(RecordSection).props().onRecordClick();
  wrapper.find(Piano).props().onEvent({
    type: KEY_DOWN,
    midiNote: 25,
  });
  expect(Recording.prototype.addEvent).toHaveBeenCalledWith({
    type: KEY_DOWN,
    midiNote: 25,
  });
});

test('It finishes the new song when the stop button is clicked', () => {
  expect.assertions(1);
  const wrapper = shallow(<App newSongEvents={null} finishNewSong={jest.fn()} />);
  wrapper.find(RecordSection).props().onRecordClick();
  wrapper.find(Piano).props().onEvent({
    type: KEY_DOWN,
    midiNote: 25,
  });
  wrapper.find(RecordSection).props().onStopClick();
  expect(Recording.prototype.end).toHaveBeenCalled();
});

test('It resets the timer when the stop button is pressed', () => {
  expect.assertions(2);
  const wrapper = shallow(<App newSongEvents={null} finishNewSong={jest.fn()} />);
  Recording.mockImplementation((onTimeChange) => {
    // mock a second passing
    onTimeChange(1);
  });
  wrapper.find(RecordSection).props().onRecordClick();
  expect(wrapper.find(RecordSection).props().currentTime).toEqual(1);
  wrapper.find(RecordSection).props().onStopClick();
  expect(wrapper.find(RecordSection).props().currentTime).toEqual(0);
});
