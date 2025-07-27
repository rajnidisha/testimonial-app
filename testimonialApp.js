const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const testimonialRoutes = require('./routes/testimonialRoutes');

dotenv.config(); // 🔐 Loads environment variables from .env

const app = express();

// ✅ Connect to MongoDB using environment variable
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch((err) => console.log('❌ MongoDB Error:', err));

// ✅ Set EJS as the view engine
app.set('view engine', 'ejs');

// ✅ Middleware to parse form data
app.use(express.urlencoded({ extended: false }));


// ✅ Serve static files like CSS, images, JS from /public
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Use routes from routes/testimonialRoutes.js
app.use('/', testimonialRoutes);

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
