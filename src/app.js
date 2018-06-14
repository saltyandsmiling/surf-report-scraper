import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/all')
      .then(res => res.json())
      .then(data => this.setState({ data }));
  }

  render() {
    if (!this.state.data) {
      return (
        <div>
          loading...
        </div>
      );
    } else {
      const surfReports = this.state.data.map((singleSurfReport, ind) => {
        const { tide, swells, conditionDetails, waveHeight, forecast } = singleSurfReport;
        return (
          <div key={ind}>
            <Card>
              <CardContent>
                <li>{tide}</li>
                <li>{swells}</li>
                <li>{conditionDetails}</li>
                <li>{waveHeight}</li>
                <li>{forecast}</li>
              </CardContent>
            </Card>
          </div>
        );
      });
      return <div>{surfReports}</div>;
    }


  }
}

export default App;
