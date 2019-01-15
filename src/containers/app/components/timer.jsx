import React from 'react';
import PropTypes from 'prop-types';

import padTime from '../helpers/pad-time';

import './timer.scss';

const Timer = ({ time }) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - (minutes * 60);
  return (
    <div className="timer">
      {padTime(minutes)}
      :
      {padTime(seconds)}
    </div>
  );
};

Timer.propTypes = {
  time: PropTypes.number.isRequired,
};

export default Timer;
