import { makeStyles } from "@material-ui/core";

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
      position: "relative",
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

  export default useStyles;