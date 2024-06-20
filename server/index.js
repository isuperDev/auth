require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connection = require('./db');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

const app = express();

// Database connection
connection();

// Middleware
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: "*", // You can restrict this to your Gitpod workspace URL for security
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies to be sent with requests
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Default route for testing
app.get('/', (req, res) => {
  res.send('Welcome to the Auth API');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});