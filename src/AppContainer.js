import React from 'react';
import ReportCard from './ReportCard';


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
    return <ReportCard data={this.state.data} />;
  }
}

export default AppContainer;
