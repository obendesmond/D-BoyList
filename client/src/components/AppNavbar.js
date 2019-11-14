import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AddItem from "./AddItem";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import dboy from "../assets/dboy.png";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row"
  },
  link: {
    marginRight: theme.spacing(4)
  }
}));

function AppNavbar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <img
              style={{ width: "30px", height: "auto", marginRight: "20px" }}
              src={dboy}
              alt="dboy"
            />
            List
          </Typography>
          <AddItem className={classes.link} />
          <Login className={classes.link} />
          <Logout className={classes.link} />
          <Register className={classes.link} />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppNavbar;
