require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');

// Kết nối đến MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
