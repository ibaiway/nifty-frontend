import React from 'react';

import './ButtonSubmit.scss';

const buttonSize = {
  sm: {
    width: '25%'
  },
  md: {
    width: '50%'
  },
  xl: {
    width: '100%'
  }
};

function ButtonSubmit({ disabled, children, size = 'xl' }) {
  return (
    <button
      disabled={disabled}
      className="buttonSubmit"
      type="submit"
      label="button"
      style={buttonSize[size]}
    >
      {children}
    </button>
  );
}

export default ButtonSubmit;
