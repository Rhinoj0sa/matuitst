import React from "react";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Image from "./THfqmB.jpg"; // Import using relative path
import { makeStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    height: "100vh",
    width: "100%",
    backgroundImage: `url(${Image})`,
  },
};
const useStyles = makeStyles(styles);
export default function () {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Link to="/home">
        <h1>Welcome</h1>
        <h2>CRUD Example Material ui</h2>
      </Link>
    </div>
  );
}
