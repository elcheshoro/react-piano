import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../../components/button/button';
import Icon from '../../../components/icon/icon';

import Song from '../helpers/song';

import './song-item.scss';

class SongItem extends Component {
  constructor() {
    super();
    this.handlePlayClick = this.handlePlayClick.bind(this);
  }

  handlePlayClick() {
    const { events } = this.props;
    const song = new Song(events);
    song.play();
  }

  render() {
    const { name } = this.props;
    return (
      <div className="song-item">
        <Button onClick={this.handlePlayClick}><Icon icon="play" /></Button>
        <div className="song-name">{name}</div>
      </div>
    );
  }
}

SongItem.propTypes = {
  name: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    midiNote: PropTypes.number,
  })).isRequired,
};

export default SongItem;
