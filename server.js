const express = require("express");
const mongoose = require("mongoose");
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended:true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Cluster0", {
    useNewUrlParser: true,
    useFindAndModify: false
});

require('./routes/htmlRoutes')(app);
require('./routes/apiRoutes')(app);


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});