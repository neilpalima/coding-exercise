import React from 'react';
import Container from '@material-ui/core/Container';

import Bid from '../../src/Bid';

export default function BidPage() {
  return (
    <Container component="main" maxWidth="md">
      <Bid />
    </Container>
  );
}