import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import AuctionItem from './AuctionItem';
import BidForm from './BidForm';
import Timer from './Timer';

import { getAuctionItemDetails, bid } from '../actions';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "10px 0px",
    width: "100%",
    height: '110vh',
    [theme.breakpoints.down('md')]: {
      height: '100%'
    }
  },
  box: {
    margin: "10px 0px"
  },
  center: {
    marginTop: "10px",
    display: "flex",
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  }
}));

export default function Bid() {
  const router = useRouter();
  const { id } = router.query;

  const classes = useStyles();

  const [timerExpired, setTimerExpired] = useState(false);

  const dispatch = useDispatch();
  const auctionItemDetailsData = useSelector((state) => state.auctionItemDetailsData);
  const bidding = useSelector((state) => state.bidding);
  const username = useSelector((state) => state.username);
  const isLoadingData = useSelector((state) => state.isLoadingData);
  const auctionEndDate = moment(auctionItemDetailsData.bid_end).utc();
  const biddingTimeLeft = auctionEndDate.diff(moment().utc(), 'minutes');
  const isBiddingEnded = biddingTimeLeft < 0 || timerExpired;
  const isUserTheHighestBidder = auctionItemDetailsData.highest_bidder === username;

  useEffect(() => {
    if (timerExpired) {
      dispatch(getAuctionItemDetails(id));
    }
  }, [timerExpired]);

  useEffect(() => {
    if (id && !bidding) {
      dispatch(getAuctionItemDetails({ id }));
    }
  }, [id, bidding]);

  const handleTimerExpiry = () => setTimerExpired(true);
  const handleBid = (values) => {
    dispatch(bid({
      ...values,
      id
    }));
  }

  return (
    <Container component="main" maxWidth="md">
      <Box className={classes.root}>
        <Box className={classes.box}>
          <AuctionItem {...auctionItemDetailsData} />
        </Box>
        <Box className={classes.center}>
          <Typography variant="h4" gutterBottom style={{textAlign: "center"}}>
            {isBiddingEnded ? 'Auction Closed' : 'Auction Time Remaining'}
          </Typography>
          {!isBiddingEnded && (
            <Timer expiryTimestamp={auctionEndDate.toDate()} onExpire={handleTimerExpiry}/>
          )}
          {!isLoadingData && !isBiddingEnded && !isUserTheHighestBidder && (
            <BidForm {...auctionItemDetailsData} onBid={handleBid} />
          )}
          {!isBiddingEnded && isUserTheHighestBidder && (
            <Typography variant="body1">
              You are the current highest bidder
            </Typography>
          )}
          {isBiddingEnded && isUserTheHighestBidder && (
            <Typography variant="body1">
              You won this item
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}