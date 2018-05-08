import React from 'react';
import PropTypes from 'prop-types';
import { icons } from '../utils/styling';

const Flag = ({ className, type }) => {
  switch (type) {
    case 'hidden':
      return <span className="hidden" />;
    case 'valid':
      return (
        <i
          className={`
            ${className}
            valid-indicator
            ${icons.valid}
          `}
        />
      );
    default:
      return (
        <span
          className={`
            ${className}
            ${type}-flag
            flag
          `}
        >
          {type}
        </span>
      );
  }
};

Flag.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['valid', 'required', 'invalid', 'hidden']).isRequired
};

Flag.defaultProps = {
  className: ''
};

export default Flag;
