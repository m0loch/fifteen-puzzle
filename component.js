import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Container, Card, makeStyles } from "@material-ui/core";
import { moveLeft, moveRight, moveUp, moveDown, moveTile } from './movesHandler';

const useStyles = makeStyles({
  "@keyframes slideLeft": {
    "0%": {
      transform: "translateX(100%)"
    },
    "100%": {
      transform: "translateX(0)"
    },
  },
  "@keyframes slideRight": {
    "0%": {
      transform: "translateX(-100%)"
    },
    "100%": {
      transform: "translateX(0)"
    },
  },
  "@keyframes slideUp": {
    "0%": {
      transform: "translateY(100%)"
    },
    "100%": {
      transform: "translateY(0)"
    },
  },
  "@keyframes slideDown": {
    "0%": {
      transform: "translateY(-100%)"
    },
    "100%": {
      transform: "translateY(0)"
    },
  },

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
  },
  transitionLeft: {
    animation: "$slideLeft 150ms linear",
  },
  transitionRight: {
    animation: "$slideRight 150ms linear",
  },
  transitionUp: {
    animation: "$slideUp 150ms linear",
  },
  transitionDown: {
    animation: "$slideDown 150ms linear",
  },
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
    const [transition, setTransition] = useState(null);

    const checkVictory = (tiles) => {
      return tiles.findIndex((el, idx) => (idx + 1) % 16 !== el) === -1;
    }

    const performMove = useCallback((callback, payload) => {
      if (!victory) {
        const move = callback(tiles, payload);
        setTiles(move.tiles);
        setTransition({
          dir: move.dir,
          idx: move.idx,
        });
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
              <Card className={`${classes.tile} ${transition?.idx === idx ? classes[`transition${transition.dir}`] : null}`} >
                <p className={classes.value} value={el}>{el}</p>
              </Card>
            </Grid>)
        })}
      </Grid>
      </Container>
    );
}

export default Fifteen;