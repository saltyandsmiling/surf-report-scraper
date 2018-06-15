import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const styles = {
  header: {
    textAlign: 'center',
    paddingTop: '5px'
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
      <Typography variant="subheading" color="textSecondary" classes={{root: classes.header}}>
        Wind
      </Typography>
      {wind.map(el => (
        <Typography variant="body2" classes={{root: classes.info}}>
          {el.timestamp} <br />
          {el.speed}kts <br />
          {el.direction}
        </Typography>
      ))}
    </div>
  )
};


export default withStyles(styles)(Wind);
