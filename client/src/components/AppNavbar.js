import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { openItemDialog } from "../actions/ItemActions";
import AddItem from './AddItem';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  Btn: {
    marginRight: theme.spacing(2)
  },
  BtnIcon: {
    marginRight: theme.spacing(2),
    color: "white"
  }
}));

function AppNavbar(props) {
  const classes = useStyles();
  const handleOpenDialog = () => {
    props.openItemDialog();
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Shopping List
          </Typography>
          <Button onClick={handleOpenDialog} className={classes.BtnIcon} >
            <AddIcon />
          </Button>
          <Button className={classes.Btn} color="inherit">
            Login
          </Button>
          <Button className={classes.Btn} color="inherit">
            Register
          </Button>
        </Toolbar>
      </AppBar>
      <AddItem />
    </div>
  );
}

AppNavbar.propTypes = {
  addItemDialog: PropTypes.bool,
  openItemDialog: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  addItemDialog: state.ItemReducer.addItemDialog
});
export default connect(
  mapStateToProps,
  { openItemDialog }
)(AppNavbar);
