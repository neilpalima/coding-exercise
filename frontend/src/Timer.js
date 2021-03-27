import React, { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export default function MyTimer({ expiryTimestamp, onExpire }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    restart,
    start
  } = useTimer({ expiryTimestamp, onExpire });

  useEffect(() => {
    restart(expiryTimestamp);
    start();
  }, [expiryTimestamp]);

  const prependZero = (value) => {
    if (value < 10) {
      return '0' + value;
    }

    return value;
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {prependZero(days)}:{prependZero(hours)}:{prependZero(minutes)}:{prependZero(seconds)}
      </Typography>
    </Box>
  );
}
