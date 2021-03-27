import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';

import { login } from '../actions';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '90vh'
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const schema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Must be at least 3 characters!')
    .required('Required'),
  password: Yup.string()
    .min(3, 'Must be at least 3 characters!')
    .required('Required'),

});

export default function Login() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const loggingIn = useSelector(state => state.loggingIn);

  return (
    <Box className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(login(values));
          setSubmitting(false);
        }}
      >
        {({ submitForm }) => (
          <Form className={classes.form}>
            <Box>
              <Field
                component={TextField}
                name="username"
                type="text"
                label="Username"
                margin="normal"
                fullWidth
              />
            </Box>
            <Box>
              <Field
                component={TextField}
                name="password"
                type="password"
                label="Password"
                margin="normal"
                fullWidth
              />
            </Box>
            {loggingIn && (
              <Box marginBottom="10px">
                <LinearProgress />
              </Box>
            )}
            <Button
              className={classes.submit}
              variant="contained"
              color="primary"
              disabled={loggingIn}
              onClick={submitForm}
              fullWidth
            >
              Sign in
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
