require("dotenv").config();
const express = require('express');
const app = express();
const routes = require("./routes")
const cors = require("cors");

require("./config/dbConfig")

const port = process.env.PORT;


app.use(cors());
app.use(express.json())
app.use(routes);



app.listen(port);