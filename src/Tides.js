import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const Tides = (props) => {
  const { tides } = props;
  return (
    <div>
      <Typography variant="subheading" color="textSecondary">Tides</Typography>
      {tides.map(tide => (
        <Typography variant="body2">
          {tide.type === 'LOW' ? 'Low' : 'High'} of {tide.height} @ {tide.timestamp}
        </Typography>
      ))}
    </div>
  );
};

Tides.propTypes = {
  tides: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    timestamp: PropTypes.string.isRequired,
  })).isRequired,
};

export default Tides;
