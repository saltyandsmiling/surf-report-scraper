import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import shortid from 'shortid';

const styles = {
  header: {
    textAlign: 'center',
    paddingTop: '5px',
  },
  info: {
    width: '20%',
    boxSizing: 'border-box',
    float: 'left',
    paddingBottom: '7px',
  },
};

const Wind = (props) => {
  const { classes, wind } = props;
  return (
    <div>
      <Typography variant="subheading" color="textSecondary" classes={{ root: classes.header }}>
        Wind
      </Typography>
      {wind.map(localWind => (
        <Typography key={shortid.generate()} variant="body2" classes={{ root: classes.info }}>
          {localWind.timestamp} <br />
          {localWind.speed}kts <br />
          {localWind.direction}
        </Typography>
      ))}
    </div>
  );
};

Wind.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
  wind: PropTypes.arrayOf(PropTypes.shape({
    timestamp: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired,
    direction: PropTypes.string.isRequired,
  })).isRequired,
};

export default withStyles(styles)(Wind);
