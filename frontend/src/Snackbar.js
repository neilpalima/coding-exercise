import React, { useEffect } from 'react';
import { useSnackbar } from 'nextjs-toast';
import { useDispatch, useSelector } from 'react-redux';

import { resetFailure, resetNotify } from '../actions';

export default function Snackbar() {
  const snackbar = useSnackbar();

  const dispatch = useDispatch();
  const notificationMessage = useSelector(state => state.notificationMessage);
  const error = useSelector(state => state.error);

  const handleMessage = (state) =>
    (message) => snackbar.showMessage(
      message,
      state,
      "filled"
    );
  const handleSuccessMessage = handleMessage('success');
  const handleErrorMessage = handleMessage('error');

  useEffect(() => {
    if (notificationMessage) {
      handleSuccessMessage(notificationMessage);
      dispatch(resetNotify());
    }
  }, [notificationMessage]);

  useEffect(() => {
    if (error?.message) {
      handleErrorMessage(error.message);
      dispatch(resetFailure());
    }
  }, [error]);

  return null;
}
