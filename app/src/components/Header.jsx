import React from 'react';

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Header = () => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <Typography align="center" color="inherit" variant="h5" style={{ flex: '1 1 auto', textAlign: 'left' }}>
        React + GraphQL
      </Typography>
      <div>
        <IconButton color="inherit" href="https://github.com/ghargrove">
          <FontAwesomeIcon icon={faGithub} />
        </IconButton>
      </div>
    </Toolbar>
  </AppBar>
);

export default Header;
