//require necessary modules
const mongoose = require("mongoose");
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const routes = require('./app/routes');

require("dotenv").config();

//connect mongodb
mongoose.connect(mongodb://127.0.0.1/my_database,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() =>{
    console.log("MongoDB connection successful");
}).catch(() => {
    console.log("MongoDB connection failed");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

routes(app);

const port = process.env.PORT || 8089;

app.listen(port, () => {
  console.log(`App is live and running at http://localhost:${port}`);
})
