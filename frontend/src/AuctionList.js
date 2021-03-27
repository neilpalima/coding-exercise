import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Input, Select, MenuItem, InputLabel, FormControl, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { getAuctionList } from '../actions';

import AuctionItem from './AuctionItem';
import Pagination from './Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%"
  },
  item: {
    margin: "10px",
    [theme.breakpoints.down('sm')]: {
      width: "100%"
    },
    [theme.breakpoints.up('md')]: {
      width: "50%"
    },
    [theme.breakpoints.up('lg')]: {
      width: "27%"
    }
  },
  column: {
    margin: "15px 0px",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  columnRight: {
    marginTop: "10px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "wrap"
  },
  formControl: {
    minWidth: 120,
  },
}));

export default function AuctionList() {
  const classes = useStyles();
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('default');
  const [q, setQ] = useState('');

  const auctionListData = useSelector((state) => state.auctionListData);

  const dispatch = useDispatch();

  useEffect(() => {
    const orderBy = sort === 'default' ? null : sort;

    dispatch(getAuctionList({
      page,
      orderBy,
      q
    }));
  }, [page, sort, q]);

  const handleClickBid = (id) => {
    router.push({
      pathname: '/auction/[id]',
      query: { id },
    });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleInputChange = (setter) =>
    (e) => {
      setter(e.target.value);
    };

  const handleSortChange = (e) => {
    setPage(1);
    setSort(e.target.value);
  }

  const results = auctionListData?.results;

  return (
    <Box className={classes.root}>
      <Box className={classes.columnRight}>
        <Box>
          <Input
            placeholder="Search Item"
            value={q}
            onChange={handleInputChange(setQ)}
          />
        </Box>
        <Box>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">Bid Price Sort</InputLabel>
            <Select
              value={sort}
              onChange={handleSortChange}
            >
              <MenuItem value={'default'}>Default</MenuItem>
              <MenuItem value={'highest_bid:asc'}>Ascending</MenuItem>
              <MenuItem value={'highest_bid:desc'}>Descending</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box className={classes.column}>
        {results?.map((item) => (
          <Box key={item.id} className={classes.item}>
            <AuctionItem
              {...item}
              onClickBid={() => handleClickBid(item.id)}
              hasAction
            />
          </Box>
        ))}
        {results?.length === 0 && (
          <Typography>
            No results found.
          </Typography>
        )}
      </Box>
      <Box className={classes.column}>
        <Pagination
          count={auctionListData?.pages || null}
          handlePageChange={handlePageChange}
          page={page}
        />
      </Box>
    </Box>
  );
}
