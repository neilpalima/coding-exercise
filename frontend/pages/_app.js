import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from "nextjs-toast";
import theme from '../src/theme';
import Header from '../src/Header';
import Snackbar from '../src/Snackbar';

import { useStore } from '../store';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    zIndex: 1,
    overflow: "hidden",
  },
  appFrame: {
    position: "relative",
    display: "flex",
    width: "100%",
    height: "100%",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    position: "absolute"
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: "100%",
    height: "calc(100% - 56px)",
    marginTop: 56,
    [theme.breakpoints.up("sm")]: {
      height: "calc(100% - 64px)",
      marginTop: 64,
    },
  },
  pointerCursor: {
    cursor: "pointer"
  }
}));

export default function App(props) {
  const { Component, pageProps } = props;
  const classes = useStyles();

  const store = useStore(pageProps.initialReduxState);
  const persistor = persistStore(store, {}, function () {
    persistor.persist();
  });


  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Antique Auction</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <PersistGate loading={<div>loading</div>} persistor={persistor}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000, anchorOrigin: { vertical: 'top', horizontal: 'center' } }}>
              <Snackbar />
              <div className={classes.root}>
                <div className={classes.appFrame}>
                  <Header />
                  <div className={classes.content}>
                    <Component {...pageProps} />
                  </div>
                </div>
              </div>
            </SnackbarProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </React.Fragment>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
