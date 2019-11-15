import React from 'react';

import { Box, CircularProgress } from '@material-ui/core/';

const Loading = () => (
  <Box data-testid="loading-box" position="absolute" top="50%" left="50%">
    <CircularProgress />
  </Box>
);

export default Loading;
