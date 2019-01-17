import React from 'react';
import { shallow } from 'enzyme';

import RecordSection from '../../../../src/containers/app/components/record-section';

test('It renders the record button if it is not recording', () => {
  expect.assertions(2);
  const wrapper = shallow(
    <RecordSection
      isRecording={false}
      currentTime={1000}
      onRecordClick={jest.fn()}
      onStopClick={jest.fn()}
    />,
  );
  expect(wrapper.find('.record-button').length).toEqual(1);
  expect(wrapper.find('.stop-button').length).toEqual(0);
});


test('It renders the stop button if it is recording', () => {
  expect.assertions(2);
  const wrapper = shallow(
    <RecordSection
      isRecording
      currentTime={1000}
      onRecordClick={jest.fn()}
      onStopClick={jest.fn()}
    />,
  );
  expect(wrapper.find('.stop-button').length).toEqual(1);
  expect(wrapper.find('.record-button').length).toEqual(0);
});
