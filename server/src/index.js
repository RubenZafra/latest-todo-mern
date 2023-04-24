const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const router = require('./router');

dotenv.config();
const uri = process.env.MONGO_URI;

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.use(router);

mongoose.connect(uri).then(() => {
    console.log('Connected to MongoDB on port 8080');
    app.listen(8080);
})
