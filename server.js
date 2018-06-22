const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const http = require('http');
const app = express();
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const cors = require('cors');
const config = require('config');

var mongodbUrl = "mongodb://127.0.0.1:27017/dnsmanagement";

const options = {
    auto_reconnect: true,
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 500, // Maintain up to 500 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    keepAlive: 120,
    promiseLibrary: require('bluebird')
};
// start mongo db
const db = mongoose.connection;

db.once('error', function (err) {
    console.error('mongoose connection error' + err);
    mongoose.disconnect();
});
db.on('open', function () {
    console.log('successfully connected to mongoose');
});
db.on('reconnected', function () {
    console.log('MongoDB reconnected!');
});
db.on('disconnected', function () {
    console.log('MongoDB disconnected!');
    mongoose.connect(mongodbUrl, options)
        .then(() => console.log('connection succesful'))
        .catch((err) => console.error(err));
});

mongoose.connect(mongodbUrl, options)
    .then(() => console.log('connection succesful'))
    .catch((err) => console.error(err));

// API file for interacting with MongoDB
// const api = require('./restapp/routes/api');
// Parsers
// app.use
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT

app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");    
    next();
});

// const whitelist = config.cros
// const corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     }
// }

// app.use(cors(), function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", config.cros);
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     next();
// });


require('./restapp/routes/index')(app);


// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));


// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//Set Port
const port = process.env.PORT || '8000';
const host = 'localhost';
console.log(port);
app.set('port', port);
// start app ===============================================
app.listen(port, host, function(){
    console.log("app listening on " + port);
});

console.log("server is at 8000");


// const server = http.createServer(app);

// server.listen(port, () => console.log(`Running on localhost:${port}`));

