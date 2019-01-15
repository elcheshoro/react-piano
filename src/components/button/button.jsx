import React from 'react';
import PropTypes from 'prop-types';

import './button.scss';

const Button = ({ children, disabled, onClick }) => (
  <button
    className="button"
    type="button"
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Button;
