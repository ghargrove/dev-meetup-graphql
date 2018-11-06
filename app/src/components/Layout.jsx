
import React from 'react';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

import Header from './Header';

const Layout = ({ children }) => (
  <div>
    <Header />
    <Grid container justify="center" spacing={16} style={{ marginTop: '24px' }}>
      <Grid item xs={9}>
        {children}
      </Grid>
      <Grid item xs={3}>
        <Typography variant="h6">
          Links
          <List>
            {
              [
                ['React', 'https://reactjs.org/docs/hello-world.html'],
                ['Apollo', 'https://www.apollographql.com/docs/react/essentials/get-started.html'],
                ['GraphQL', 'https://graphql.org/learn/'],
              ].map(([text, href], k) => (
                <ListItem button component="a" href={href} key={k}><ListItemText primary={text} /></ListItem>
              ))
            }
          </List>
        </Typography>
        
      </Grid>
    </Grid>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
