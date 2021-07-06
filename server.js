const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./src/routes');

const app = express();
const port = process.env.PORT || 5000;

require("dotenv").config();

mongoose.connect('mongodb+srv://problemstatement:aumobi@cluster0.4mriu.mongodb.net/aumobi?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}, function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log('MongoDB connesso con successo!')
    }
})

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(routes);

app.listen(port, function () {
    console.log('Server running on port: ' + port)
});
