import Typography from '@components/Typography';
import React from 'react';
import Box from '@components/Box';

function ErrorMessage(props) {
  return (
    <Box mt={0.5}>
      <Typography color="error" variant="caption" {...props} />
    </Box>
  );
}

export default ErrorMessage;
