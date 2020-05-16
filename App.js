const express = require('express');
const app= express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// imported file 

const loguser = require('./route/users')

//--------

mongoose.connect('mongodb+srv://code-shop:ninijosue75482860.com@node-shop-ts1dw.gcp.mongodb.net/test?retryWrites=true&w=majority',
 {useNewUrlParser: true,
    useCreateIndex: true});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5500");
    res.header("Access-Control-Allow-Credentials", true);
    
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, PACTH, GET');
    return res.status(200).json({});
    }

    next();
  });





app.use('/youtube', loguser)


app.use((req, res, next) => {
    const error = new error('not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res,next) => {
    res.status(error.status || 500);
    res.json({
        error: {
        message: error.message
    }})
})

module.exports = app;


