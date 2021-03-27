import React from 'react';
import { Container } from '@material-ui/core';
import { useSelector } from 'react-redux';

import AuctionList from '../src/AuctionList';

export default function Index() {

  const token = useSelector(state => state.token);

  if (!token) {
    return null;
  }

  return (
    <Container maxWidth="xl">
      <AuctionList />
    </Container>
  );
}
