import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Container, Card, makeStyles } from "@material-ui/core";
import { moveLeft, moveRight, moveUp, moveDown, moveTile } from './movesHandler';

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

    const [tiles, setTiles] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,15]);
    const [victory, setVictory] = useState(false);

    const checkVictory = (tiles) => {
      return tiles.findIndex((el, idx) => (idx + 1) % 16 !== el) === -1;
    }

    const performMove = useCallback((callback, payload) => {
      if (!victory) {
        setTiles(callback(tiles, payload));
      }
    }, [tiles, victory]);

    const handleUserKeyPress = useCallback((event) => {
        switch (event.key) {
          case 'A':
          case 'a':
          case 'ArrowLeft':
            performMove(moveLeft);
            return;
  
          case 'D':
          case 'd':
          case 'ArrowRight':
            performMove(moveRight);
            return;
  
          case 'W':
          case 'w':
          case 'ArrowUp':
            performMove(moveUp);
            return;

          case 'S':
          case 's':
          case 'ArrowDown':
            performMove(moveDown);
            return;
  
          default:
            return;
        }      
    }, [performMove]);

    useEffect(() => {
      window.addEventListener("keydown", handleUserKeyPress);
      return () => {
        window.removeEventListener("keydown", handleUserKeyPress);
      };
    }, [handleUserKeyPress]);


    if (!victory && checkVictory(tiles)) {
      setVictory(true);

      // TODO: actual win screen
      console.log('GOOD JOB');
    }

    return (
      <Container className={classes.container}>
      <Grid container className={classes.root}>
        {tiles.map((el, idx) => {
          return (<Grid container item
                    xs={3} className={`${el === 0 ? classes.hole : ""} ${classes.tileEmbed}`} key={el}
                    onClick={() => performMove(moveTile, idx)}>
              <Card className={classes.tile}>
                <p className={classes.value} value={el}>{el}</p>
              </Card>
            </Grid>)
        })}
      </Grid>
      </Container>
    );
}

export default Fifteen;