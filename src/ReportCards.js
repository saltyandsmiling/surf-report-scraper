import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import { withStyles } from '@material-ui/core/styles';
import Swells from './Swells';
import Tides from './Tides';
import Wind from './Wind';


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

const ReportCards = (props) => {
  const { classes, data } = props;
  const reportCards = data.map((locationData) => {
    const { location, swells, tides, wind } = locationData;
    return (
      <div key={shortid.generate()}>
        <Card classes={{ root: classes.root }}>
          <CardContent>
            <Typography classes={{ root: classes.header }} gutterBottom>{location}</Typography>
            <Swells swells={swells} />
            <Tides tides={tides} />
            <Wind wind={wind} />
          </CardContent>
        </Card>
      </div>
    );
  });
  return <div>{ reportCards }</div>;
};

ReportCards.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    location: PropTypes.string.isRequired,
    swells: PropTypes.array.isRequired,
    tides: PropTypes.array.isRequired,
    wind: PropTypes.array.isRequired,
  })).isRequired,
};

export default withStyles(styles)(ReportCards);
