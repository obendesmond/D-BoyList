import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  openItemDialog,
  addItem,
  closeItemDialog
} from "../actions/ItemActions";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

function AddItem(props) {
  const [itemName, setItemName] = React.useState("");

  const handleClose = () => {
    props.closeItemDialog();
  };
  const handleAddItem = () => {
    if (itemName.length === 0) {
      alert("items name can't be empty ");
    } else {
      handleClose();
      const newItem = {
        name: itemName
      };
      props.addItem(newItem);
    }
  };
  const handleKeyUp = e => {
    if (e.key === "Enter") {
      handleAddItem();
    }
    setItemName(e.target.value);
  };

  const handleOpenDialog = () => {
    props.openItemDialog();
  };

  return props.isAuthenticated ? (
    <React.Fragment>
      <Button
        onClick={handleOpenDialog}
        style={{ marginRight: "5px", color: "white" }}
      >
        <AddIcon />
      </Button>

      <Dialog
        open={props.addItemDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="item name"
            type="text"
            fullWidth
            autoComplete="off"
            onKeyUp={handleKeyUp}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={handleAddItem}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  ) : null;
}

AddItem.propTypes = {
  addItemDialog: PropTypes.bool,
  closeItemDialog: PropTypes.func.isRequired,
  openItemDialog: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  addItemDialog: state.ItemReducer.addItemDialog,
  isAuthenticated: state.AuthReducer.isAuthenticated
});

export default connect(mapStateToProps, {
  openItemDialog,
  addItem,
  closeItemDialog
})(AddItem);
