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
import { closeRegForm, openRegForm } from "../../actions/RegistrationAction";
import { register } from "../../actions/AuthActions";
import { clearErrors } from "../../actions/ErrorActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Register(props) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);

  useEffect(() => {
    if (props.errorId === "REGISTER_FAIL") {
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
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else {
      alert("could not get value of " + e.target.name);
    }

    if (e.key === "Enter") {
      handleRegister();
    }
  };

  const handleRegister = () => {
    //   registration
    const newUser = {
      name,
      email,
      password
    };
    props.register(newUser);
    if (props.isAuthenticated === true) handleClose();
  };

  const handleClose = () => {
    props.closeRegForm();
  };

  const handleCloseError = () => {
    props.clearErrors();
  };
  const handleOpenRegForm = () => {
    props.openRegForm();
  };

  return props.isAuthenticated ? null : (
    <React.Fragment>
      <Button onClick={handleOpenRegForm} color="inherit">
        Register
      </Button>
      <Dialog
        open={props.showRegForm}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Register</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Register and start adding something.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="username"
            type="text"
            fullWidth
            name="name"
            onKeyUp={handleFields}
            autoComplete="off"
          />
          <TextField
            margin="dense"
            id="email"
            label="email"
            type="email"
            fullWidth
            name="email"
            onKeyUp={handleFields}
            autoComplete="off"
          />
          <TextField
            margin="dense"
            id="password"
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
          <Button onClick={() => handleRegister()} color="primary">
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
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{error}</span>}
        action={[
          <IconButton
            key="close"
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

Register.propTypes = {
  showRegForm: PropTypes.bool,
  closeRegForm: PropTypes.func,
  register: PropTypes.func.isRequired,
  errorId: PropTypes.string,
  errorMsg: PropTypes.string,
  clearErrors: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  openRegForm: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  showRegForm: state.RegistrationReducer.showRegForm,
  errorId: state.ErrorReducer.id,
  errorMsg: state.ErrorReducer.msg.msg,
  isAuthenticated: state.AuthReducer.isAuthenticated
});
export default connect(mapStateToProps, {
  openRegForm,
  closeRegForm,
  register,
  clearErrors
})(Register);
