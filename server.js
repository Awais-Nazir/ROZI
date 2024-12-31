const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();
// Define the Port
const PORT = process.env.PORT || 5000;
// Initialize Express app
const app = express();

// Middleware
// app.use(cors({
//   origin: "https://rozirotipk.netlify.app/",
// }));

app.use(cors());

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Models
const User = require('./models/User');
const Service = require('./models/Service');
const authRoutes = require('./routes/auth');
const serviceRoutes = require('./routes/services');




// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Admin Side of RoziRoti.pk! with latest updated cors');
});
// Use service routes
// app.use("/ uploads", express.static("uploads"));
app.use('/api/services', serviceRoutes);
app.use('/api/auth', authRoutes);
// Test Route to verify Models
app.get('/test', async (req, res) => {
  try {
    // Create a test user
    const user = new User({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      password: 'password123',
      role: 'seller',
    });
    await user.save();

    // Create a test service
    const service = new Service({
      seller: user._id,
      title: 'Electrician Service',
      description: 'I provide reliable electrician services.',
      category: 'Electrician',
    });
    await service.save();

    // Return user and service
    res.json({ user, service });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

// Start server

app.listen(PORT, () => console.log(`Server running on Render.com`));
