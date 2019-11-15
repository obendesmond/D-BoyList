const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const config = require("config");

const app = express();

// body parser
app.use(bodyParser.json());

// DB config
/*const db =
  process.env.NODE_ENV === "production"
    ? config.get("mongoURI")
    : "mongodb://localhost:27017/shopping_list";*/
const db = config.get("mongoURI");

// connection to mongodb
mongoConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};
mongoose
  .connect(db, mongoConfig)
  .then(() => {
    process.env.NODE_ENV === "production"
      ? console.log("mongodb connected...online")
      : console.log("mongodb connected...offline");
  })
  .catch(err => console.log(err));

// routes
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    // load index.html file
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
