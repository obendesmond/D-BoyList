import React from "react";
import { logout } from "../../actions/AuthActions";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import Button from "@material-ui/core/Button";

function Logout(props) {
  return (
    <React.Fragment>
      {props.isAuthenticated ? (
        <Button color="inherit" href="#" onClick={props.logout}>
          Logout
        </Button>
      ) : null}
    </React.Fragment>
  );
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
  isAuthenticated: state.AuthReducer.isAuthenticated
});
export default connect(mapStateToProps, { logout })(Logout);
