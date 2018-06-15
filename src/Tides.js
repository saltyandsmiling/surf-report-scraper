import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const styles = {

};

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


export default withStyles(styles)(Tides);
