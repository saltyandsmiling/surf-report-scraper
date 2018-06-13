import React from 'react';
import { Switch, Route } from 'react-router-dom';
import InvoiceDisplayContainer from './containers/InvoiceDisplayContainer.jsx';

const App = () => (
  <app>
    <Switch>
      <Route exact path='/' component={InvoiceDisplayContainer} />
    </Switch>
  </app>
);

export default App;
