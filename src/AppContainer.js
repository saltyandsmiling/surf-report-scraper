import React from 'react';
import ReportCard from './ReportCard';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    float: 'left',
  },
};

class AppContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/all')
      .then(res => res.json())
      .then(data => this.setState({ data }))
      .catch(err => console.log(err));
  }

  render() {
    if (!this.state.data) return <div> loading... </div>;
    const reportCards = this.state.data.map(locationData => {
      return <ReportCard styles={styles} data={locationData} />;
    })
    return <div>{reportCards}</div>;
  }
}

export default withStyles(styles)(AppContainer);
