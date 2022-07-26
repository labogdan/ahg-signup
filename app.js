const express = require('express');
const bodyParser = require('body-parser');

const feedRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 8080;

// application/json
app.use(bodyParser.json());

app.use(express.static('build'));

// to get access to the server from any domain like postman.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

//declaration of the routes.
app.use('/feed', feedRoutes);


app.listen(PORT);
