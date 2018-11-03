/**
 * <App/> component
 */

import React from 'react';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import teal from '@material-ui/core/colors/teal'

import Layout from './Layout';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[900],
    },
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Layout>
      <div>Lets do some graphql stuff</div>
    </Layout>
  </MuiThemeProvider>
);

export default App;
