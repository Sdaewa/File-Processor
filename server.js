const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
const port = 8000;

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port port!`));
