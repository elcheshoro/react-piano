import React from 'react';
import PropTypes from 'prop-types';

import './icon.scss';

const Icon = ({ icon }) => <div className={`icon ${icon}`} />;

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default Icon;
