import React from 'react';
import { shallow } from 'enzyme';

import TextInput from '../../../src/components/text-input/text-input';

test('It calls the on change handler with the new value when the value changes', () => {
  expect.assertions(1);
  const onChange = jest.fn();
  const wrapper = shallow(
    <TextInput
      placeholder="Please enter a name"
      onChange={onChange}
      value="new_song"
    />,
  );
  wrapper.find('input').props().onChange({
    target: { value: 'new_song2' },
  });
  expect(onChange).toHaveBeenCalledWith('new_song2');
});
