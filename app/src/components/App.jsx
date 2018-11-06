/**
 * <App/> component
 */

import React from 'react';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Beer from '../pages/Beer';
import Brewer from '../pages/Brewer';
import client from '../client';
import Home from '../pages/Home';
import Layout from './Layout';
import Whoops from '../pages/Whoops';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[900],
    },
  },
});

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/brewers" component={Home} />
            <Route exact path="/brewers/:brewer(\d)" component={Brewer} />
            <Route path="/brewers/:brewer(\d)/beers/:beer(\d)" component={Beer} />
            <Route component={Whoops} />
          </Switch>
        </Layout>
      </MuiThemeProvider>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
