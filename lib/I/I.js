import React from 'react';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import regular from '@fortawesome/fontawesome-free-regular';
import solid from '@fortawesome/fontawesome-free-solid';
import PropTypes from 'prop-types';

fontawesome.library.add(regular, solid);

const I = ({ className, ...rest }) => {
  return (
    <FontAwesomeIcon
      {...rest}
      className={className}
    />
  );
};

I.propTypes = {
  className: PropTypes.string,
  hidden: PropTypes.bool,
  icon: PropTypes.string.isRequired
};

I.defaultProps = {
  className: '',
  hidden: false
};

export default I;
