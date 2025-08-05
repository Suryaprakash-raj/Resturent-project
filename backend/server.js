require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const auth = require('./middleware/auth');
const app = express();
const foodRoutes = require('./routes/foodRoutes');

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/menu', require('./routes/menuRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/offers', require('./routes/offerRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/foods', foodRoutes);

// Home Route
app.get('/', (req, res) => {
  res.send('Restaurant API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
