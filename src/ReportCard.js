import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';

const styles = {
  root: {
    maxWidth: '500px',
  },
  header: {
    background: blue[500],
    color: 'white',
    maxWidth: '100%',
    maxHeight: '100px',
    padding: '15px',
  },
}

const ReportCard = (props) => {
  const { classes, data } = props;
  const surfReports = data.map((singleSurfReport, ind) => {
    const { location, swells, tides, wind } = singleSurfReport;
    return (
      <div key={ind}>
        <Card classes={{root: classes.root}}>
          <CardContent>
            <Typography variant='Title' classes={{root: classes.header}} gutterBottom>{location}</Typography>
            {swells.map((localSwellInfo) => <div>{localSwellInfo}</div> )}
            {tides.map(el => <div>{el.type} of {el.height} @ {el.timestamp}</div>)}
            {/*{wind.map(el => <div>{el.timestamp} {el.speed} {el.direction}</div>)}*/}
          </CardContent>
        </Card>
      </div>
    );
  });
  return <div>{surfReports}</div>;
};

export default withStyles(styles)(ReportCard);
