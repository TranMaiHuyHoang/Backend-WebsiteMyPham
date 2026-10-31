const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const productRoute = require('./routes/productRoute');
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRoute);

app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Website My Pham API is running'
    });
});



module.exports = app;
