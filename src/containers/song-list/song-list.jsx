import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SongItem from './components/song-item';

import './song-list.scss';

const SongList = ({ songs }) => {
  if (songs.length === 0) {
    return <div className="song-list no-song-message">No songs to display.</div>;
  }

  return (
    <div>
      {songs.map(song => (
        <SongItem
          key={song.name}
          {...song}
        />
      ))}
    </div>
  );
};

SongList.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    events: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string.isRequired,
      time: PropTypes.number.isRequired,
      midiNote: PropTypes.number,
    })).isRequired,
  })).isRequired,
};

const mapStateToProps = state => ({
  songs: state.songs.get('songs'),
});

export { SongList };

export default connect(mapStateToProps)(SongList);
