import React from 'react';

import { Box, CircularProgress } from '@material-ui/core/';

const Loading = () => (
  <Box position="absolute" top="50%" left="50%">
    <CircularProgress />
  </Box>
);

export default Loading;
