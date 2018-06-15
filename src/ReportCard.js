import React from 'react';
import Swells from './Swells'
import Tides from './Tides'
import Wind from './Wind'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';

const styles = {
  root: {
    maxWidth: '400px',
  },
  header: {
    background: blue[500],
    color: 'white',
    maxWidth: '100%',
    maxHeight: '100px',
    padding: '15px',
  },
};

const ReportCard = (props) => {
  const { classes, data } = props;
  const { location, swells, tides, wind } = data;
  return (
    <div>
      <Card classes={{root: classes.root}}>
        <CardContent>
          <Typography classes={{root: classes.header}} gutterBottom>{location}</Typography>
          <Swells swells={swells} />
          <Tides tides={tides} />
          <Wind wind={wind} />
        </CardContent>
      </Card>
    </div>
  );
};

export default withStyles(styles)(ReportCard);
