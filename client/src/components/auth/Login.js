import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { closeLoginForm, openLoginForm } from "../../actions/LoginActions";
import { login } from "../../actions/AuthActions";
import { clearErrors } from "../../actions/ErrorActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);

  useEffect(() => {
    if (props.errorId === "LOGIN_FAIL") {
      setError(props.errorMsg);
    } else {
      setError(null);
    }
    return () => {
      setError(null);
    };
  }, [props.errorId]);

  useEffect(() => {
    handleClose();
  }, [props.isAuthenticated]);

  const handleFields = e => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else {
      alert("could not get value of " + e.target.name);
    }

    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = () => {
    //   login user
    const user = {
      email,
      password
    };
    if (props.isAuthenticated === true) handleClose();
    props.login(user);
  };

  const handleClose = () => {
    props.closeLoginForm();
  };

  const handleCloseError = () => {
    props.clearErrors();
  };
  const handleOpenLoginForm = () => {
    props.openLoginForm();
  };

  return props.isAuthenticated ? null : (
    <React.Fragment>
      <Button onClick={handleOpenLoginForm} color="inherit">
        Login
      </Button>
      <Dialog
        open={props.showLoginForm}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Login</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Login and add something.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="loginemail"
            label="email"
            type="email"
            fullWidth
            name="email"
            onKeyUp={handleFields}
            autoComplete="off"
          />
          <TextField
            margin="dense"
            id="loginpassword"
            label="password"
            type="password"
            fullWidth
            name="password"
            onKeyUp={handleFields}
            autoComplete="off"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleLogin()} color="primary">
            Ride On
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={error ? true : false}
        autoHideDuration={6000}
        onClose={handleCloseError}
        ContentProps={{
          "aria-describedby": "login-message-id"
        }}
        message={<span id="login-message-id">{error}</span>}
        action={[
          <IconButton
            key="closebtn"
            aria-label="close"
            color="inherit"
            onClick={handleCloseError}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </React.Fragment>
  );
}

Login.propTypes = {
  showLoginForm: PropTypes.bool,
  closeLoginForm: PropTypes.func,
  login: PropTypes.func.isRequired,
  errorId: PropTypes.string,
  errorMsg: PropTypes.string,
  clearErrors: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  openLoginForm: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  showLoginForm: state.LoginReducer.showLoginForm,
  errorId: state.ErrorReducer.id,
  errorMsg: state.ErrorReducer.msg.msg,
  isAuthenticated: state.AuthReducer.isAuthenticated
});
export default connect(mapStateToProps, {
  openLoginForm,
  closeLoginForm,
  login,
  clearErrors
})(Login);
