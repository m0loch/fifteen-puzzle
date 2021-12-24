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

function getInitialConfiguration() {
  const shuffleBag = [];
  for (let i = 1; i <= 15; i++) {
    shuffleBag.push(i);
  }

  const result = [];
  let parity = true;

  for (; shuffleBag.length > 2;) {
    // takes a number out of the shuffle bag and inserts it at the end
    let num = shuffleBag.splice(Math.floor(Math.random() * shuffleBag.length), 1)[0];
    result.push(num);

    // parity check - needed to keep the configuration in the domain of solvability
    // eslint-disable-next-line
    shuffleBag.forEach(item => {
      if (num > item) {
          parity = !parity;
      }
    });
  }

  // adds the last two numbers taking the parity into account
  result.push(shuffleBag.splice(parity ? 0 : 1, 1)[0]);
  result.push(shuffleBag[0]);
  result.push(0);

  return result;
}

function Fifteen() {
    const classes = useStyles();

    const [tiles, setTiles] = useState(getInitialConfiguration());
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