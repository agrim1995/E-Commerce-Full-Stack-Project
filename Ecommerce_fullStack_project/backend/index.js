const express = require('express');
const connectDB = require('./config/db.js');
const dotenv = require('dotenv');
const cors = require('cors');
const fileUpload = require('express-fileupload')

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());


app.use('/api/users', require('./routes/userRouter'));
app.use('/api/category', require('./routes/categoryRouter'));
app.use('/api/product', require('./routes/productRouter'));
app.use('/api/brand', require('./routes/brandRouter'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
