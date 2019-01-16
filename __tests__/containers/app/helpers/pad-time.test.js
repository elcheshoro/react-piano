import padTime from '../../../../src/containers/app/helpers/pad-time';

test('It pads the value with leading zeroes to two digits if the value is less than two digits', () => {
  expect.assertions(1);
  expect(padTime(2)).toEqual('02');
});

test('It leaves the value unaltered if the value is two or more digits', () => {
  expect.assertions(1);
  expect(padTime(222)).toEqual('222');
});
