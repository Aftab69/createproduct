const express = require("express");
const router = require("./routes");
const cors = require('cors');
const path = require("path");
const app = express();
app.use(express.json());
app.use(cors());
require("./connection");
app.use(router);

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.listen(5000,
    console.log("app running at port 5000")
)