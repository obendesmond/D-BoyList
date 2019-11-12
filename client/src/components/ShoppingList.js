import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import InboxIcon from "@material-ui/icons/Inbox";
import Container from "@material-ui/core/Container";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

import { connect } from "react-redux";
import {
  getItems,
  deleteItem,
  removeItem
} from "../actions/ItemActions";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "lightgrey",
    height: "600px",
    paddingTop: theme.spacing(3)
  },
  listItem: {
    marginBottom: theme.spacing(2)
  }
}));

function ShoppingList(props) {
  const classes = useStyles();
  const [showList, setShowList] = React.useState(false);

  useEffect(() => {
    setShowList("true");
    return () => {
      setShowList("false");
    };
  }, [showList]);

  useEffect(() => {
    props.getItems();
  }, [props]);

  const handleDelete = id => {
    props.deleteItem(id);
  };

  const handleRemove = id => {
    props.removeItem(id);
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <List component="nav" aria-label="main mailbox folders">
          {props.items.map((item, index) => (
            <Grow
              key={index}
              direction="up"
              in={props.deletedItemId !== item._id}
              {...(showList ? { timeout: 500 } : {})}
              onExited={() => handleDelete(item._id)}
            >
              <Paper className={classes.listItem}>
                <ListItem button>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => handleRemove(item._id)}
                      edge="end"
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Paper>
            </Grow>
          ))}
        </List>
      </Container>
    </div>
  );
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  items: PropTypes.array,
  deletedItemId: PropTypes.string
};

const mapStateToProps = state => ({
  items: state.ItemReducer.items,
  deletedItemId: state.ItemReducer.deletedItemId
});
export default connect(
  mapStateToProps,
  { getItems, deleteItem, removeItem }
)(ShoppingList);
