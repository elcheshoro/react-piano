import React from 'react';
import PropTypes from 'prop-types';

import './button.scss';

const Button = ({ children, onClick }) => (
  <button className="button" type="button" onClick={onClick}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
