const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');

// item model
const Item = require("../../models/Item");

// fetching item: public
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: 1 })
    .then(items => res.json(items));
});

// create item: private
router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem
    .save()
    .then(item => res.json(item))
    .catch(err => console.log(err));
});

// delete item: private
router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => {
      item.remove().then(() => res.json({ success: true}))
      // console.log(req.params.id);
    })
    .catch(err => {
      res.json({ success: false, msg:err })
      // console.log(req.params.id);
    });
});

module.exports = router;
