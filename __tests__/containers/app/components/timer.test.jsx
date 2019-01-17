import React from 'react';
import { shallow } from 'enzyme';

import Timer from '../../../../src/containers/app/components/timer';

import padTime from '../../../../src/containers/app/helpers/pad-time';

jest.mock('../../../../src/containers/app/helpers/pad-time');

test('It displays the correct time', () => {
  expect.assertions(1);
  padTime.mockImplementation(value => value.toString());
  const wrapper = shallow(<Timer time={659} />);
  expect(wrapper.text()).toEqual('10:59');
});
