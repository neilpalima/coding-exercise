import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import { logout } from '../actions';

const useStyles = makeStyles((theme) => ({
  appBar: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
    cursor: "pointer"
  }
}));

export default function Header() {
  const classes = useStyles();

  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  useEffect(() => {
    if (!token && router.pathname !== '/login') {
      router.push('/login');
    }
    if (token && router.pathname === '/login') {
      router.push('/');
    }
  }, [token, router.pathname]);

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          className={classes.title}
          onClick={() => router.push('/')}
        >
          Antique Auction
        </Typography>
        {token && (
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
