import React from 'react';
import { shallow } from 'enzyme';
import { Piano as ReactPiano } from 'react-piano';

import Piano from '../../../src/components/piano/piano';
import Note from '../../../src/helpers/note';

import { KEY_DOWN, KEY_UP } from '../../../src/constants/song-event-types';

jest.mock('../../../src/helpers/note');

beforeEach(() => {
  jest.resetAllMocks();
  jest.resetModules();
});

test('When a key is pressed down it calls the on event handler prop with the event', () => {
  expect.assertions(1);
  const onEvent = jest.fn();
  const wrapper = shallow(<Piano onEvent={onEvent} disabled={false} />);
  wrapper.find(ReactPiano).get(0).props.playNote(25);
  expect(onEvent).toHaveBeenCalledWith({
    midiNote: 25,
    type: KEY_DOWN,
  });
});

test('When a key is pressed down it plays the note', () => {
  expect.assertions(1);
  const onEvent = jest.fn();
  const wrapper = shallow(<Piano onEvent={onEvent} disabled={false} />);
  wrapper.find(ReactPiano).get(0).props.playNote(25);
  expect(Note).toHaveBeenCalledWith(25);
});

test('When a key is released it calls the on event handler prop with the event', () => {
  expect.assertions(1);
  const onEvent = jest.fn();
  const wrapper = shallow(<Piano onEvent={onEvent} disabled={false} />);
  wrapper.find(ReactPiano).get(0).props.playNote(25);
  wrapper.find(ReactPiano).get(0).props.stopNote(25);
  expect(onEvent).toHaveBeenCalledWith({
    midiNote: 25,
    type: KEY_UP,
  });
});

test('When a key is released it fades the note out', () => {
  expect.assertions(1);
  const onEvent = jest.fn();
  const wrapper = shallow(<Piano onEvent={onEvent} disabled={false} />);
  wrapper.find(ReactPiano).get(0).props.playNote(25);
  wrapper.find(ReactPiano).get(0).props.stopNote(25);
  expect(Note.prototype.fadeOut).toHaveBeenCalled();
});

test('When the piano is not disabled the keyboard shortcuts are enabled', () => {
  expect.assertions(1);
  const onEvent = jest.fn();
  const wrapper = shallow(<Piano onEvent={onEvent} disabled={false} />);
  expect(wrapper.find(ReactPiano).get(0).props.keyboardShortcuts).not.toEqual(null);
});

test('When the piano is disabled the keyboard shortcuts are disabled', () => {
  expect.assertions(1);
  const onEvent = jest.fn();
  const wrapper = shallow(<Piano onEvent={onEvent} disabled />);
  expect(wrapper.find(ReactPiano).get(0).props.keyboardShortcuts).toEqual(null);
});
