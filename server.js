const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const logger = require("morgan")

const PORT = process.env.PORT || 3001;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended:true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});

require('./routes/htmlRoutes')(app);
require('./routes/apiRoutes')(app);


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});