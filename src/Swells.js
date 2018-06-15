import React from 'react';
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
      <CardContent classes={{root: classes.root}}>
        <Typography color='textSecondary' variant='subheading'>Swells</Typography>
        {swells.map((localSwellInfo) => <Typography variant='body2'>{localSwellInfo}</Typography>)}
      </CardContent>
    </div>
  );
};


export default withStyles(styles)(Swells);
