import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  media: {
    height: 300,
  },
  action: {
    marginTop: "10px",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
});

export default function AuctionItem({
  product,
  highest_bid: highestBid = 0,
  hasAction,
  actionTitle = "Bid",
  onClickBid,
  id
}) {
  const classes = useStyles();
  const {
    name,
    description,
  } = product || {};

  return (
    <>
      <Card>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={`/static/images/${(id % 7) + 1}.svg`}
              title={name}
            />
            <CardContent>
              <Box className={classes.title}>
                <Typography gutterBottom variant="h5" component="h2">
                  {name}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  ${highestBid}
                </Typography>
              </Box>
              <Typography variant="body1" color="textSecondary" component="p">
                {description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        {hasAction && (
          <Box className={classes.action}>
            <Button
              variant="contained"
              color="primary"
              onClick={onClickBid}
            >
              {actionTitle}
            </Button>
          </Box>
        )}
    </>
  );

  // return (
  //   <Card>
  //     <CardActionArea>
  //       <CardMedia
  //         className={classes.media}
  //         image="https://www.thoughtco.com/thmb/v5fuyNkg8LATJP2DSnZ34xoOaF8=/1885x1414/smart/filters:no_upscale()/GettyImages-622013488-55a1fad50d93429fb927087e1f18cff8.jpg"
  //         title="Contemplative Reptile"
  //       />
  //       <CardContent>
  //         <Typography gutterBottom variant="h5" component="h2">
  //           {name}
  //         </Typography>
  //         <Typography variant="body2" color="textSecondary" component="p">
  //           {description}
  //         </Typography>
  //       </CardContent>
  //     </CardActionArea>
  //     <CardActions className={classes.action}>
  //       <Button
  //         variant="contained"
  //         color="primary"
  //         onClick={() => {
  //           router.push({
  //             pathname: '/auction/[id]',
  //             query: { id },
  //           })
  //         }}
  //       >
  //         Bid
  //       </Button>
  //     </CardActions>
  //   </Card>
  // );
}