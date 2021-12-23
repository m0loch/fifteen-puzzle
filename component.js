import React from 'react';
import { Grid, Container, Card, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    width: "40vw",
    ['@media (max-width:969px)']: { // eslint-disable-line no-useless-computed-key
      width: "80vw",
    }
  },
  root: {
    marginTop: "8px",
    backgroundColor: "var(--header-background)",
    borderRadius: "5px",
  },
  tileEmbed: {
    padding: "1vw",
  },
  tile: {
    display: "flex",
    backgroundColor: "var(--square-color)",
    color: "var(--a-color)",
    alignContent: "center",
    justifyContent: "center",
    width: "8vw",
    height: "8vw",
    ['@media (max-width:969px)']: { // eslint-disable-line no-useless-computed-key
      width: "16vw",
      height: "16vw",
    }
  },
  value: {
    margin: "auto",
  },
  hole: {
    opacity: "0",
  }
});

function Fifteen() {
    const classes = useStyles();

    const tiles = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,15];

    return (
      <Container className={classes.container}>
      <Grid container spacing={12} className={classes.root}>
        {tiles.map(el => {
          return (<Grid container item xs={3} className={`${el === 0 ? classes.hole : ""} ${classes.tileEmbed}`}>
              <Card className={classes.tile}>
                <p className={classes.value}>{el}</p>
              </Card>
            </Grid>)
        })}
      </Grid>
      </Container>
    );
}

export default Fifteen;