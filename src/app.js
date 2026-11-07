const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const productRoute = require('./routes/productRoute');
const postRoute = require('./routes/postRoute');
const categoryRoute = require('./routes/categoryRoute');
const reviewRoute = require('./routes/reviewRoute');
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/products', productRoute);
app.use('/api/posts', postRoute);
app.use('/api/category', categoryRoute);
app.use('/api/review', reviewRoute)
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Website My Pham API is running'
    });
});




module.exports = app;
