import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../../components/button/button';
import Timer from './timer';

import './record-section.scss';

class RecordSection extends Component {
  renderRecordButton() {
    const { isRecording, onStopClick, onRecordClick } = this.props;
    if (isRecording) {
      return (
        <div className="stop-button">
          <Button onClick={onStopClick}>
            <div className="button-text">Stop</div>
          </Button>
        </div>
      );
    }

    return (
      <div className="record-button">
        <Button onClick={onRecordClick}>
          <div className="button-text">Record</div>
        </Button>
      </div>
    );
  }

  render() {
    const { currentTime } = this.props;
    return (
      <div className="record-section">
        {this.renderRecordButton()}
        <Timer time={Math.floor(currentTime)} />
      </div>
    );
  }
}

RecordSection.propTypes = {
  currentTime: PropTypes.number.isRequired,
  isRecording: PropTypes.bool.isRequired,
  onStopClick: PropTypes.func.isRequired,
  onRecordClick: PropTypes.func.isRequired,
};

export default RecordSection;
