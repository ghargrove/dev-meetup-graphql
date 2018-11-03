
import React from 'react';

import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Header from './Header';

const Layout = ({ children }) => (
  <div>
    <Header />
    {children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
