const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');

// ✅ Show Submit Form Page (URL: /submit)
router.get('/submit', (req, res) => {
  res.render('home'); // views/home.ejs form page
});

// ✅ Handle Form Submission (POST /submit)
router.post('/submit', testimonialController.postTestimonial);


// ✅ Show all testimonials (URL: /testimonials)
router.get('/testimonials', testimonialController.getAllTestimonials);

// ✅ Show single testimonial by ID (URL: /testimonial/:id)
router.get('/testimonial/:id', testimonialController.getSingleTestimonial);

// (Optional) Redirect root to /submit or /testimonials if needed
router.get('/', (req, res) => {
  res.redirect('/submit'); // You can change this to /testimonials if you prefer
});

module.exports = router;
