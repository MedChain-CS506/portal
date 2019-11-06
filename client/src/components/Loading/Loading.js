import React from 'react';

//* MUI
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = () => (
  <Box position="absolute" top="50%" left="50%">
    <CircularProgress />
  </Box>
);

export default Loading;
