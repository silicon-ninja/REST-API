const express = require('express'); // Importing the Package 
const app = express(); // Executing the Package
const mongoose = require('mongoose');
require('dotenv/config');

const homeroutes = require('./routes/home') 
const bodyparser = require('body-parser');


// JSON Incoming Request 

app.use(bodyparser.json());

// Assigning Routes 
app.use('/',homeroutes);

// Database 
mongoose.connect(process.env.DB_CONNECTION,
        { useNewUrlParser: true },
            ()=> console.log('Database Connetion Established'));




// Listening to the Messeages

app.listen('port',process.env.PORT || 8800);