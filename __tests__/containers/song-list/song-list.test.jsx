import React from 'react';
import { shallow } from 'enzyme';

import SongItem from '../../../src/containers/song-list/components/song-item';
import { SongList } from '../../../src/containers/song-list/song-list';

import { SONG_STOP } from '../../../src/constants/song-event-types';

test('It displays the no songs message if there are no songs', () => {
  expect.assertions(2);
  const wrapper = shallow(
    <SongList
      songs={[]}
    />,
  );
  expect(wrapper.text()).toEqual('No songs to display.');
  expect(wrapper.find(SongItem).length).toEqual(0);
});

test('It displays the list if there are songs', () => {
  expect.assertions(1);
  const wrapper = shallow(
    <SongList
      songs={[
        {
          id: '123-123-123-123',
          name: 'My song',
          events: [
            {
              type: SONG_STOP,
              time: 50,
            },
          ],
        },
        {
          id: '321-321-321-321',
          name: 'My longer song',
          events: [
            {
              type: SONG_STOP,
              time: 100,
            },
          ],
        },
      ]}
    />,
  );
  expect(wrapper.find(SongItem).length).toEqual(2);
});
