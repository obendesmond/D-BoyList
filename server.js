const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');

// routes
const items = require('./routes/api/items');

const app = express();

// body parser
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI;

// connection to mongodb
mongoConfig = {
    useNewUrlParser:true,
    useUnifiedTopology: true
}
mongoose
  .connect(db,mongoConfig)
  .then(() => console.log("mongodb connected..."))
  .catch(err => console.log(err));

app.use('/api/items',items)

// Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
  //set static folder
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    // load index.html file
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// port 
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));