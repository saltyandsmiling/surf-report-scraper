import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

const styles = {
  root: {
    width: '50%',
    boxSizing: 'border-box',
    float: 'left',
    paddingLeft: 0,
    paddingTop: 0,
  },
};

const Swells = (props) => {
  const { classes, swells } = props;
  return (
    <div>
      <CardContent classes={{ root: classes.root }}>
        <Typography color="textSecondary" variant="subheading">Swells</Typography>
        {swells.map(localSwellInfo => <Typography variant="body2">{localSwellInfo}</Typography>)}
      </CardContent>
    </div>
  );
};

Swells.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
  swells: PropTypes.arrayOf(PropTypes.string).isRequired,
};


export default withStyles(styles)(Swells);
