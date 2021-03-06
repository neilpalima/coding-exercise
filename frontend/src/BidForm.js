import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useSelector } from 'react-redux';
import { Button, LinearProgress, Box } from '@material-ui/core';
import { TextField, CheckboxWithLabel } from 'formik-material-ui';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: "10px 0px",
    },
  },
}));

export default function BidForm({ highest_bid: highestBid, onBid }) {
  if (!highestBid) return null;

  const bidding = useSelector((state) => state.bidding);

  const schema = Yup.object().shape({
    bid: Yup.number()
      .min(highestBid + 1, 'Too Low!')
      .integer('Whole Numbers Only!')
      .required('Required'),
    activateAutoBid: Yup.boolean(),
    max_bid: Yup.number()
      .when('activateAutoBid', {
        is: true,
        then: Yup.number()
          .integer('Whole Numbers Only!')
          .test(
            'is-higher-than-bid',
            'Too Low than Bid Price!',
            (value, context) => value > context.parent.bid
          )
          .required('Required'),
      })
  });

  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        bid: highestBid + 1,
        activateAutoBid: false,
        max_bid: ''
      }}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        const maxBid = values.activateAutoBid && values.max_bid || undefined;
        onBid({
          ...values,
          max_bid: maxBid
        });
        setSubmitting(false);
      }}
    >
      {({ submitForm, values }) => (
        <Form className={classes.root}>
          <Box>
            <Field
              component={TextField}
              name="bid"
              type="number"
              label="Bid Price"
            />
          </Box>
          <Box>
            <Field
              component={CheckboxWithLabel }
              type="checkbox"
              name="activateAutoBid"
              label="Auto Bid"
              color="primary"
              Label={{ label: 'Auto Bid' }}
            />
          </Box>
          {values.activateAutoBid && (
            <Box>
              <Field
                component={TextField}
                name="max_bid"
                type="number"
                label="Max Auto Bid Price"
              />
            </Box>
          )}
          {bidding && (
            <Box marginBottom="10px">
              <LinearProgress />
            </Box>
          )}
          <Box marginBottom="10px">
            <Button
              variant="contained"
              color="primary"
              disabled={bidding}
              onClick={submitForm}
            >
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}