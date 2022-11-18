const express = require("express");
const router = require("./routes");
const app = express();
app.use(express.json())
require("./connection");
app.use(router)

app.listen(5000,
    console.log("app running at port 5000")
)