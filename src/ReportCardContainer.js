import React from 'react';
import ReportCards from './ReportCards';

class ReportCardContainer extends React.Component {
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
      .catch(err => err);
  }

  render() {
    if (!this.state.data) return (<div> loading... </div>);
    return <ReportCards data={this.state.data} />;
  }
}

export default ReportCardContainer;
