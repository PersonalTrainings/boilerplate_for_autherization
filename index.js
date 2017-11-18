// Main starting point of the appliaction
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/config.json');

// DB Setup
mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.dbName}`, {
  useMongoClient: true,
})

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());
router(app);


// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);